const DEFAULT_ROUTE = '#/home';

const ROUTE_PATTERNS = [
    { name: 'home', pattern: /^\/home\/?$/ },
    { name: 'course', pattern: /^\/course\/?$/ },
    { name: 'practice', pattern: /^\/practice\/?$/ },
    { name: 'progress', pattern: /^\/progress\/?$/ },
    { name: 'unit', pattern: /^\/unit\/(\d+)\/?$/, params: ['number'] },
    { name: 'lesson', pattern: /^\/lesson\/(\d+\.\d+)\/?$/, params: ['id'] }
];

function normalizePath(value = '') {
    let path = String(value || '').trim();

    if (!path || path === '#') {
        return '/home';
    }

    path = path.replace(/^#/, '');
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    path = path.replace(/\/{2,}/g, '/');
    if (path.length > 1) {
        path = path.replace(/\/+$/, '');
    }

    return path || '/home';
}

function decodeParameter(value) {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

export function parseRoute(hash = globalThis.location?.hash || DEFAULT_ROUTE) {
    const path = normalizePath(hash);

    for (const route of ROUTE_PATTERNS) {
        const match = path.match(route.pattern);
        if (!match) continue;

        const params = {};
        (route.params || []).forEach((name, index) => {
            const rawValue = decodeParameter(match[index + 1]);
            params[name] = name === 'number' ? Number(rawValue) : rawValue;
        });

        return {
            name: route.name,
            path,
            params
        };
    }

    return {
        name: 'not-found',
        path,
        params: {}
    };
}

export function routeToHash(path) {
    return `#${normalizePath(path)}`;
}

export function createRouter({ windowRef = globalThis.window, documentRef = globalThis.document } = {}) {
    if (!windowRef) {
        throw new Error('Router requires a window-like object.');
    }

    const listeners = new Set();
    let started = false;
    let lastRouteKey = '';

    const current = () => parseRoute(windowRef.location?.hash || DEFAULT_ROUTE);

    function emit({ force = false } = {}) {
        const route = current();
        const routeKey = `${route.name}:${route.path}`;

        if (!force && routeKey === lastRouteKey) {
            return route;
        }

        lastRouteKey = routeKey;
        listeners.forEach(listener => listener(route));
        return route;
    }

    function navigate(path, { replace = false } = {}) {
        const hash = routeToHash(path);

        if (windowRef.location.hash === hash) {
            emit({ force: true });
            return;
        }

        if (replace && windowRef.history?.replaceState) {
            windowRef.history.replaceState(null, '', hash);
            emit({ force: true });
            return;
        }

        windowRef.location.hash = hash;
    }

    function handleClick(event) {
        if (!documentRef || event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        const anchor = event.target?.closest?.('a[data-route]');
        if (!anchor) return;
        if (anchor.target && anchor.target !== '_self') return;

        const href = anchor.getAttribute('href') || '';
        if (!href.startsWith('#/')) return;

        event.preventDefault();
        navigate(href);
    }

    function start() {
        if (started) return;
        started = true;

        windowRef.addEventListener('hashchange', emit);
        documentRef?.addEventListener('click', handleClick);

        if (!windowRef.location.hash || windowRef.location.hash === '#') {
            navigate(DEFAULT_ROUTE, { replace: true });
        } else {
            emit({ force: true });
        }
    }

    function stop() {
        if (!started) return;
        started = false;
        windowRef.removeEventListener('hashchange', emit);
        documentRef?.removeEventListener('click', handleClick);
    }

    function subscribe(listener, { immediate = false } = {}) {
        if (typeof listener !== 'function') {
            throw new TypeError('Router subscriber must be a function.');
        }

        listeners.add(listener);
        if (immediate) listener(current());
        return () => listeners.delete(listener);
    }

    return {
        current,
        navigate,
        start,
        stop,
        subscribe
    };
}
