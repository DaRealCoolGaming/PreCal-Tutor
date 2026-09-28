export function functionTransformPoint(x, { family = 'quadratic', a = 1, h = 0, k = 0 } = {}) {
    const input = x - h;
    let base;
    if (family === 'absolute') base = Math.abs(input);
    else if (family === 'sqrt') base = input < 0 ? NaN : Math.sqrt(input);
    else if (family === 'cubic') base = input ** 3;
    else base = input ** 2;
    return { x, y: a * base + k };
}


export function exponentialLogPoint(x, { family = 'exp', base = 2, a = 1, h = 0, k = 0 } = {}) {
    if (!(base > 0) || base === 1) return { x, y: NaN };
    if (family === 'log') {
        const input = x - h;
        return { x, y: input > 0 ? a * (Math.log(input) / Math.log(base)) + k : NaN };
    }
    return { x, y: a * (base ** (x - h)) + k };
}

export function unitCirclePoint(angleRadians) {
    return {
        x: Math.cos(angleRadians),
        y: Math.sin(angleRadians),
        tan: Math.abs(Math.cos(angleRadians)) < 1e-10 ? Infinity : Math.tan(angleRadians)
    };
}

export function trigValue(x, { family = 'sin', a = 1, b = 1, c = 0, d = 0 } = {}) {
    const t = b * (x - c);
    const sin = Math.sin(t);
    const cos = Math.cos(t);
    let base;
    if (family === 'cos') base = cos;
    else if (family === 'tan') base = Math.abs(cos) < 1e-10 ? NaN : sin / cos;
    else if (family === 'cot') base = Math.abs(sin) < 1e-10 ? NaN : cos / sin;
    else if (family === 'sec') base = Math.abs(cos) < 1e-10 ? NaN : 1 / cos;
    else if (family === 'csc') base = Math.abs(sin) < 1e-10 ? NaN : 1 / sin;
    else base = sin;
    return a * base + d;
}

export function vectorProperties(x, y) {
    return {
        magnitude: Math.hypot(x, y),
        directionRadians: Math.atan2(y, x),
        directionDegrees: (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
    };
}

export function obliqueTriangleSAS(a, b, angleDegrees) {
    const C = angleDegrees * Math.PI / 180;
    const c = Math.sqrt(Math.max(0, a * a + b * b - 2 * a * b * Math.cos(C)));
    const area = 0.5 * a * b * Math.sin(C);
    return { a, b, C: angleDegrees, c, area };
}

export function geometricPartialSum(a1, ratio, terms) {
    const n = Math.max(0, Math.floor(terms));
    if (n === 0) return 0;
    if (Math.abs(ratio - 1) < 1e-12) return a1 * n;
    return a1 * (1 - ratio ** n) / (1 - ratio);
}

export function parametricPoint(t, { x = value => value, y = value => 0.25 * value ** 2 - 2 } = {}) {
    return { x: x(t), y: y(t) };
}

export function polarPoint(theta, radiusFn) {
    const radius = radiusFn(theta);
    return { radius, x: radius * Math.cos(theta), y: radius * Math.sin(theta) };
}


export function parametricFamilyPoint(family, t, { a = 4, b = 2, h = 0, k = 0 } = {}) {
    if (family === 'circle') return { x: h + a * Math.cos(t), y: k + a * Math.sin(t) };
    if (family === 'ellipse') return { x: h + a * Math.cos(t), y: k + b * Math.sin(t) };
    if (family === 'line') return { x: h + t, y: k + b * t };
    return { x: h + t, y: k + b * t * t };
}

export function polarRadius(theta, { family = 'limacon', a = 3, b = 2, n = 3, trig = 'cos' } = {}) {
    const fn = trig === 'sin' ? Math.sin : Math.cos;
    if (family === 'circle') return a * fn(theta);
    if (family === 'rose') return a * fn(n * theta);
    if (family === 'lemniscate') {
        const value = a * a * fn(2 * theta);
        return value < 0 ? NaN : Math.sqrt(value);
    }
    return a + b * fn(theta);
}

export function conicDescriptor(kind) {
    const descriptors = {
        circle: { equation: 'x² + y² = 9', summary: 'Center (0, 0), radius 3.' },
        parabola: { equation: 'y = 0.35x² − 2', summary: 'Vertex (0, −2), opens upward.' },
        ellipse: { equation: 'x²/16 + y²/4 = 1', summary: 'Horizontal major axis.' },
        hyperbola: { equation: 'x²/4 − y²/4 = 1', summary: 'Branches open left and right.' }
    };
    return descriptors[kind] || descriptors.circle;
}


export function conicGeometry(kind, { h = 0, k = 0, a = 4, b = 2, p = 1 } = {}) {
    const family = ['circle','parabola','ellipse','hyperbola'].includes(kind) ? kind : 'circle';
    const A = Math.max(0.5, Math.abs(Number(a) || 1));
    const B = Math.max(0.5, Math.abs(Number(b) || 1));
    const P = Number(p) || 1;
    if (family === 'circle') return { family, h, k, radius: A, center: { x:h, y:k } };
    if (family === 'parabola') return { family, h, k, p:P, vertex:{x:h,y:k}, focus:{x:h,y:k+P}, directrix:`y = ${k-P}` };
    if (family === 'ellipse') {
        const major=Math.max(A,B), minor=Math.min(A,B), horizontal=A>=B, c=Math.sqrt(Math.max(0,major*major-minor*minor));
        return { family,h,k,a:major,b:minor,horizontal,c,center:{x:h,y:k} };
    }
    const c=Math.sqrt(A*A+B*B);
    return { family,h,k,a:A,b:B,c,horizontal:true,center:{x:h,y:k},asymptoteSlope:B/A };
}

export function mountMathExplorer(container, type, options = {}) {
    if (!container) return () => {};
    const mounts = {
        function: mountFunctionExplorer,
        unitCircle: mountUnitCircleExplorer,
        trig: mountTrigExplorer,
        vector: mountVectorExplorer,
        triangle: mountTriangleExplorer,
        geometricSeries: mountSeriesExplorer,
        expLog: mountExpLogExplorer,
        conic: mountConicExplorer,
        parametric: mountParametricExplorer,
        polar: mountPolarExplorer
    };
    const mount = mounts[type];
    if (!mount) {
        container.innerHTML = '<p class="muted">This interactive is not available yet.</p>';
        return () => {};
    }
    return mount(container, options);
}

function canvasRuntime(canvas, draw) {
    let frame = 0;
    const render = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const rect = canvas.getBoundingClientRect();
            const width = Math.max(280, rect.width || 600);
            const height = Math.max(220, Number(canvas.dataset.height) || 300);
            const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.height = `${height}px`;
            const ctx = canvas.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, width, height);
            draw(ctx, width, height);
        });
    };
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(render) : null;
    observer?.observe(canvas);
    render();
    return { render, cleanup: () => { cancelAnimationFrame(frame); observer?.disconnect(); } };
}

function axes(ctx, width, height, xRange = 10, yRange = 8) {
    const sx = width / xRange;
    const sy = height / yRange;
    ctx.strokeStyle = '#d8d5cb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
    ctx.stroke();
    return { sx, sy, cx: width / 2, cy: height / 2 };
}

function slider(label, name, min, max, step, value) {
    return `<label class="graph-control"><span>${label}</span><strong data-value-for="${name}">${value}</strong><input id="${name}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
}

function mountFunctionExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls">${slider('Vertical scale a','fx-a',-3,3,.25,1)}${slider('Horizontal shift h','fx-h',-4,4,.25,0)}${slider('Vertical shift k','fx-k',-4,4,.25,0)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="300" aria-label="Interactive function transformation graph"></canvas></div></div>`;
    const canvas = container.querySelector('canvas');
    let params = { a: 1, h: 0, k: 0 };
    const runtime = canvasRuntime(canvas, (ctx, width, height) => {
        const { sx, sy, cx, cy } = axes(ctx, width, height, 12, 10);
        ctx.strokeStyle = '#2f695d'; ctx.lineWidth = 2.5; ctx.beginPath();
        let started = false;
        for (let px = 0; px <= width; px += 2) {
            const x = (px - cx) / sx;
            const { y } = functionTransformPoint(x, params);
            const py = cy - y * sy;
            if (!Number.isFinite(py) || py < -50 || py > height + 50) { started = false; continue; }
            if (!started) { ctx.moveTo(px, py); started = true; } else ctx.lineTo(px, py);
        }
        ctx.stroke();
    });
    container.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
        params = { a: Number(container.querySelector('#fx-a').value), h: Number(container.querySelector('#fx-h').value), k: Number(container.querySelector('#fx-k').value) };
        container.querySelector(`[data-value-for="${input.id}"]`).textContent = input.value;
        runtime.render();
    }));
    return runtime.cleanup;
}

function mountUnitCircleExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls">${slider('Angle θ','uc-angle',0,360,1,45)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas graph-canvas--direct" data-height="300" aria-label="Interactive unit circle. Drag the radius or use the angle slider.">Use the angle slider above to explore unit-circle coordinates.</canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas = container.querySelector('canvas');
    const input = container.querySelector('#uc-angle');
    const renderReadout = () => {
        const deg = Number(input.value);
        const theta = deg * Math.PI / 180;
        const point = unitCirclePoint(theta);
        container.querySelector('[data-readout]').textContent = `${deg}° · (${point.x.toFixed(3)}, ${point.y.toFixed(3)}) · tan θ ${Number.isFinite(point.tan) ? `≈ ${point.tan.toFixed(3)}` : 'is undefined'}`;
        return { deg, theta, point };
    };
    const runtime = canvasRuntime(canvas, (ctx, width, height) => {
        const { point } = renderReadout();
        const radius = Math.min(width, height) * .34; const cx = width / 2; const cy = height / 2;
        ctx.strokeStyle = '#d8d5cb'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx-radius-25,cy);ctx.lineTo(cx+radius+25,cy);ctx.moveTo(cx,cy-radius-25);ctx.lineTo(cx,cy+radius+25);ctx.stroke();
        ctx.strokeStyle = '#2f695d'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.stroke();
        const px = cx + point.x*radius, py = cy - point.y*radius;
        ctx.beginPath(); ctx.moveTo(cx,cy);ctx.lineTo(px,py);ctx.stroke(); ctx.fillStyle='#2f695d';ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();
    });
    const sync = () => { container.querySelector('[data-value-for="uc-angle"]').textContent=input.value; runtime.render(); };
    input.addEventListener('input', sync);
    let dragging = false;
    const setFromPointer = event => {
        const rect = canvas.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let degrees = Math.atan2(cy - event.clientY, event.clientX - cx) * 180 / Math.PI;
        if (degrees < 0) degrees += 360;
        input.value = String(Math.round(degrees) % 360);
        sync();
    };
    const down = event => { dragging = true; canvas.setPointerCapture?.(event.pointerId); setFromPointer(event); };
    const move = event => { if (dragging) setFromPointer(event); };
    const up = event => { dragging = false; canvas.releasePointerCapture?.(event.pointerId); };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    return () => {
        runtime.cleanup();
        input.removeEventListener('input', sync);
        canvas.removeEventListener('pointerdown', down);
        canvas.removeEventListener('pointermove', move);
        canvas.removeEventListener('pointerup', up);
        canvas.removeEventListener('pointercancel', up);
    };
}

function mountTrigExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls"><label class="graph-control"><span>Family</span><select id="trig-family"><option value="sin">Sine</option><option value="cos">Cosine</option><option value="tan">Tangent</option><option value="cot">Cotangent</option><option value="sec">Secant</option><option value="csc">Cosecant</option></select></label>${slider('Amplitude/scale a','trig-a',-3,3,.25,1)}${slider('Frequency b','trig-b',.5,4,.25,1)}${slider('Phase c','trig-c',-3.14,3.14,.26,0)}${slider('Midline d','trig-d',-3,3,.25,0)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="300" aria-label="Interactive trigonometric graph"></canvas></div></div>`;
    const canvas=container.querySelector('canvas'); const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const family=container.querySelector('#trig-family').value; const params={family,a:Number(container.querySelector('#trig-a').value),b:Number(container.querySelector('#trig-b').value),c:Number(container.querySelector('#trig-c').value),d:Number(container.querySelector('#trig-d').value)};
        const {sx,sy,cx,cy}=axes(ctx,width,height,Math.PI*4,10);ctx.strokeStyle='#2f695d';ctx.lineWidth=2.3;ctx.beginPath();let drawing=false;let lastY=null;
        for(let px=0;px<=width;px+=1){const x=(px-cx)/sx;const y=trigValue(x,params);const py=cy-y*sy;const jump=lastY!==null&&Math.abs(y-lastY)>5;if(!Number.isFinite(y)||Math.abs(y)>8||jump){drawing=false;lastY=y;continue;}if(!drawing){ctx.moveTo(px,py);drawing=true;}else ctx.lineTo(px,py);lastY=y;}ctx.stroke();
    });
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;runtime.render();}));
    container.querySelector('select').addEventListener('change',runtime.render);return runtime.cleanup;
}

function mountVectorExplorer(container) {
    container.innerHTML=`<div class="graph-panel"><div class="graph-controls">${slider('x component','vec-x',-8,8,1,4)}${slider('y component','vec-y',-8,8,1,3)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas graph-canvas--direct" data-height="300" aria-label="Interactive vector. Drag the endpoint or use the component sliders.">Use the component sliders above to explore the vector.</canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas=container.querySelector('canvas');
    const xInput=container.querySelector('#vec-x');
    const yInput=container.querySelector('#vec-y');
    let geometry={sx:1,sy:1,cx:0,cy:0};
    const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const x=Number(xInput.value),y=Number(yInput.value),info=vectorProperties(x,y);
        geometry=axes(ctx,width,height,20,16);
        const {sx,sy,cx,cy}=geometry;
        const px=cx+x*sx,py=cy-y*sy;
        ctx.strokeStyle='#2f695d';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(px,py);ctx.stroke();
        const angle=Math.atan2(py-cy,px-cx); const head=11;
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-head*Math.cos(angle-.45),py-head*Math.sin(angle-.45));ctx.moveTo(px,py);ctx.lineTo(px-head*Math.cos(angle+.45),py-head*Math.sin(angle+.45));ctx.stroke();
        ctx.fillStyle='#2f695d';ctx.beginPath();ctx.arc(px,py,5,0,Math.PI*2);ctx.fill();
        container.querySelector('[data-readout]').textContent=`v = ⟨${x}, ${y}⟩ · magnitude ≈ ${info.magnitude.toFixed(2)} · direction ≈ ${info.directionDegrees.toFixed(1)}°`;
    });
    const sync=()=>{container.querySelector('[data-value-for="vec-x"]').textContent=xInput.value;container.querySelector('[data-value-for="vec-y"]').textContent=yInput.value;runtime.render();};
    xInput.addEventListener('input',sync);yInput.addEventListener('input',sync);
    let dragging=false;
    const setFromPointer=event=>{
        const rect=canvas.getBoundingClientRect();
        const px=event.clientX-rect.left,py=event.clientY-rect.top;
        const x=Math.max(-8,Math.min(8,Math.round((px-geometry.cx)/geometry.sx)));
        const y=Math.max(-8,Math.min(8,Math.round((geometry.cy-py)/geometry.sy)));
        xInput.value=String(x);yInput.value=String(y);sync();
    };
    const down=event=>{dragging=true;canvas.setPointerCapture?.(event.pointerId);setFromPointer(event);};
    const move=event=>{if(dragging)setFromPointer(event);};
    const up=event=>{dragging=false;canvas.releasePointerCapture?.(event.pointerId);};
    canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
    return()=>{runtime.cleanup();xInput.removeEventListener('input',sync);yInput.removeEventListener('input',sync);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);};
}

function mountTriangleExplorer(container) {
    container.innerHTML=`<div class="graph-panel"><div class="graph-controls">${slider('Side a','tri-a',2,14,.5,7)}${slider('Side b','tri-b',2,14,.5,9)}${slider('Included angle C','tri-c',15,150,1,60)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="300" aria-label="Interactive oblique triangle"></canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas=container.querySelector('canvas');
    const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const a=Number(container.querySelector('#tri-a').value),b=Number(container.querySelector('#tri-b').value),C=Number(container.querySelector('#tri-c').value),info=obliqueTriangleSAS(a,b,C);
        const theta=C*Math.PI/180;
        const margin=45; const scale=Math.min((width-2*margin)/(a+b+2),(height-2*margin)/(Math.max(a,b)+2))*1.6;
        const ox=margin,oy=height-margin;
        const bx=ox+b*scale,by=oy;
        const ax=ox+a*Math.cos(theta)*scale,ay=oy-a*Math.sin(theta)*scale;
        ctx.strokeStyle='#2f695d';ctx.lineWidth=2.7;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(bx,by);ctx.lineTo(ax,ay);ctx.closePath();ctx.stroke();
        ctx.fillStyle='#2f695d';for(const [x,y] of [[ox,oy],[bx,by],[ax,ay]]){ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fill();}
        ctx.font='14px system-ui';ctx.fillText('C',ox+8,oy-8);ctx.fillText('A',bx-14,by-8);ctx.fillText('B',ax+7,ay-6);
        container.querySelector('[data-readout]').textContent=`a=${a}, b=${b}, C=${C}° → c≈${info.c.toFixed(3)} · area≈${info.area.toFixed(3)}`;
    });
    const sync=input=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;runtime.render();};
    const inputs=[...container.querySelectorAll('input')];inputs.forEach(input=>input.addEventListener('input',()=>sync(input)));
    return runtime.cleanup;
}

function mountSeriesExplorer(container) {
    container.innerHTML=`<div class="graph-panel"><div class="graph-controls">${slider('First term a₁','series-a',-6,6,.5,2)}${slider('Ratio r','series-r',-1.5,1.5,.05,.5)}${slider('Terms n','series-n',1,30,1,8)}</div><p class="math-display" data-readout role="status" aria-live="polite"></p></div>`;
    const render=()=>{const a=Number(container.querySelector('#series-a').value),r=Number(container.querySelector('#series-r').value),n=Number(container.querySelector('#series-n').value);const sum=geometricPartialSum(a,r,n);container.querySelector('[data-readout]').textContent=`S${n} ≈ ${sum.toFixed(4)}${Math.abs(r)<1?` · infinite sum → ${(a/(1-r)).toFixed(4)}`:' · no finite infinite sum'}`;};
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;render();}));render();return()=>{};
}


function mountExpLogExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls"><label class="graph-control"><span>Family</span><select id="expl-family"><option value="exp">Exponential</option><option value="log">Logarithmic</option></select></label><label class="graph-control"><span>Base b</span><select id="expl-base"><option value="2">2</option><option value="3">3</option><option value="0.5">1/2</option></select></label>${slider('Vertical scale a','expl-a',-3,3,.25,1)}${slider('Horizontal shift h','expl-h',-4,4,.25,0)}${slider('Vertical shift k','expl-k',-4,4,.25,0)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="320" aria-label="Interactive exponential and logarithmic inverse graph"></canvas></div><p class="review-note" data-readout></p></div>`;
    const canvas = container.querySelector('canvas');
    const runtime = canvasRuntime(canvas, (ctx,width,height) => {
        const family=container.querySelector('#expl-family').value;
        const params={family,base:Number(container.querySelector('#expl-base').value),a:Number(container.querySelector('#expl-a').value),h:Number(container.querySelector('#expl-h').value),k:Number(container.querySelector('#expl-k').value)};
        const {sx,sy,cx,cy}=axes(ctx,width,height,16,12);
        ctx.strokeStyle='#2f695d';ctx.lineWidth=2.4;ctx.beginPath();let drawing=false;
        for(let px=0;px<=width;px+=1){const x=(px-cx)/sx;const {y}=exponentialLogPoint(x,params);const py=cy-y*sy;if(!Number.isFinite(y)||py<-80||py>height+80){drawing=false;continue;}if(!drawing){ctx.moveTo(px,py);drawing=true;}else ctx.lineTo(px,py);}ctx.stroke();
        ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle='#8f8b80';ctx.lineWidth=1.2;ctx.beginPath();
        if(family==='exp'){const py=cy-params.k*sy;ctx.moveTo(0,py);ctx.lineTo(width,py);container.querySelector('[data-readout]').textContent=`Exponential: horizontal asymptote y = ${params.k}.`;}
        else {const px=cx+params.h*sx;ctx.moveTo(px,0);ctx.lineTo(px,height);container.querySelector('[data-readout]').textContent=`Logarithmic: vertical asymptote x = ${params.h}.`;}
        ctx.stroke();ctx.restore();
    });
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;runtime.render();}));
    container.querySelectorAll('select').forEach(select=>select.addEventListener('change',runtime.render));
    return runtime.cleanup;
}

function mountConicExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls"><label class="graph-control"><span>Conic</span><select id="conic-kind"><option value="circle">Circle</option><option value="parabola">Parabola</option><option value="ellipse">Ellipse</option><option value="hyperbola">Hyperbola</option></select></label>${slider('Horizontal shift h','conic-h',-5,5,.5,0)}${slider('Vertical shift k','conic-k',-5,5,.5,0)}${slider('Primary size a','conic-a',1,6,.5,4)}${slider('Secondary size b','conic-b',1,5,.5,2)}${slider('Parabola p','conic-p',-4,4,.5,1)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="330" aria-label="Interactive conic graph"></canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas=container.querySelector('canvas');
    const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const kind=container.querySelector('#conic-kind').value;
        const params={h:Number(container.querySelector('#conic-h').value),k:Number(container.querySelector('#conic-k').value),a:Number(container.querySelector('#conic-a').value),b:Number(container.querySelector('#conic-b').value),p:Number(container.querySelector('#conic-p').value)};
        if(Math.abs(params.p)<0.25) params.p=0.5;
        const info=conicGeometry(kind,params);
        const {sx,sy,cx,cy}=axes(ctx,width,height,20,16);
        const X=x=>cx+x*sx, Y=y=>cy-y*sy;
        ctx.strokeStyle='#2f695d';ctx.lineWidth=2.4;
        if(kind==='circle'){
            ctx.beginPath();ctx.ellipse(X(info.h),Y(info.k),info.radius*sx,info.radius*sy,0,0,Math.PI*2);ctx.stroke();
            container.querySelector('[data-readout]').textContent=`Circle center (${info.h}, ${info.k}), radius ${info.radius}.`;
        } else if(kind==='ellipse'){
            const rx=(info.horizontal?info.a:info.b)*sx, ry=(info.horizontal?info.b:info.a)*sy;
            ctx.beginPath();ctx.ellipse(X(info.h),Y(info.k),rx,ry,0,0,Math.PI*2);ctx.stroke();
            container.querySelector('[data-readout]').textContent=`Ellipse center (${info.h}, ${info.k}), ${info.horizontal?'horizontal':'vertical'} major axis, c≈${info.c.toFixed(2)}.`;
        } else if(kind==='hyperbola'){
            ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle='#8f8b80';ctx.lineWidth=1.2;
            for(const sign of [-1,1]){ctx.beginPath();for(let px=0;px<=width;px++){const x=(px-cx)/sx;const y=info.k+sign*info.asymptoteSlope*(x-info.h);if(px===0)ctx.moveTo(px,Y(y));else ctx.lineTo(px,Y(y));}ctx.stroke();}
            ctx.restore();ctx.strokeStyle='#2f695d';ctx.lineWidth=2.4;
            for(const branch of [-1,1]){ctx.beginPath();let started=false;for(let y=-7;y<=7;y+=.03){const x=info.h+branch*info.a*Math.sqrt(1+((y-info.k)*(y-info.k))/(info.b*info.b));const px=X(x),py=Y(y);if(!started){ctx.moveTo(px,py);started=true;}else ctx.lineTo(px,py);}ctx.stroke();}
            container.querySelector('[data-readout]').textContent=`Horizontal hyperbola center (${info.h}, ${info.k}), a=${info.a}, b=${info.b}, asymptote slopes ±${info.asymptoteSlope.toFixed(2)}.`;
        } else {
            ctx.beginPath();let started=false;const p=info.p;
            for(let x=-9;x<=9;x+=.03){const y=info.k+((x-info.h)*(x-info.h))/(4*p);if(!Number.isFinite(y)||Math.abs(y)>10){started=false;continue;}const px=X(x),py=Y(y);if(!started){ctx.moveTo(px,py);started=true;}else ctx.lineTo(px,py);}ctx.stroke();
            ctx.save();ctx.setLineDash([6,5]);ctx.strokeStyle='#8f8b80';ctx.beginPath();ctx.moveTo(0,Y(info.k-p));ctx.lineTo(width,Y(info.k-p));ctx.stroke();ctx.restore();
            ctx.fillStyle='#2f695d';ctx.beginPath();ctx.arc(X(info.h),Y(info.k+p),4,0,Math.PI*2);ctx.fill();
            container.querySelector('[data-readout]').textContent=`Parabola vertex (${info.h}, ${info.k}), focus (${info.h}, ${(info.k+p).toFixed(1)}), directrix y=${(info.k-p).toFixed(1)}.`;
        }
    });
    const render=()=>runtime.render();
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;render();}));
    container.querySelector('select').addEventListener('change',render);
    return runtime.cleanup;
}


function mountParametricExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls"><label class="graph-control"><span>Family</span><select id="param-family"><option value="parabola">Parabola</option><option value="line">Line</option><option value="circle">Circle</option><option value="ellipse">Ellipse</option></select></label>${slider('Horizontal/primary a','param-a',1,6,.5,4)}${slider('Vertical b','param-b',-4,4,.5,1)}${slider('Horizontal shift h','param-h',-4,4,.5,0)}${slider('Vertical shift k','param-k',-4,4,.5,0)}${slider('Current t','param-t',-6.28,6.28,.05,0)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="330" aria-label="Interactive parametric graph"></canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas=container.querySelector('canvas');
    const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const family=container.querySelector('#param-family').value;
        const params={a:Number(container.querySelector('#param-a').value),b:Number(container.querySelector('#param-b').value),h:Number(container.querySelector('#param-h').value),k:Number(container.querySelector('#param-k').value)};
        const current=Number(container.querySelector('#param-t').value);
        const {sx,sy,cx,cy}=axes(ctx,width,height,20,16); const X=x=>cx+x*sx,Y=y=>cy-y*sy;
        ctx.strokeStyle='#2f695d';ctx.lineWidth=2.4;ctx.beginPath();let started=false;
        const lo=(family==='circle'||family==='ellipse')?0:-6.3,hi=(family==='circle'||family==='ellipse')?Math.PI*2:6.3;
        for(let i=0;i<=420;i++){const t=lo+(hi-lo)*i/420;const point=parametricFamilyPoint(family,t,params);const px=X(point.x),py=Y(point.y);if(!Number.isFinite(px)||!Number.isFinite(py)||py<-100||py>height+100){started=false;continue;}if(!started){ctx.moveTo(px,py);started=true;}else ctx.lineTo(px,py);}ctx.stroke();
        const point=parametricFamilyPoint(family,current,params);ctx.fillStyle='#8a4f32';ctx.beginPath();ctx.arc(X(point.x),Y(point.y),5,0,Math.PI*2);ctx.fill();
        container.querySelector('[data-readout]').textContent=`t=${current.toFixed(2)} → (${point.x.toFixed(2)}, ${point.y.toFixed(2)}). The marker shows direction/order information that a rectangular curve alone does not preserve.`;
    });
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;runtime.render();}));
    container.querySelector('select').addEventListener('change',runtime.render);
    return runtime.cleanup;
}

function mountPolarExplorer(container) {
    container.innerHTML = `<div class="graph-panel"><div class="graph-controls"><label class="graph-control"><span>Family</span><select id="polar-family"><option value="limacon">Limaçon</option><option value="circle">Circle</option><option value="rose">Rose</option><option value="lemniscate">Lemniscate</option></select></label><label class="graph-control"><span>Trig</span><select id="polar-trig"><option value="cos">cos</option><option value="sin">sin</option></select></label>${slider('a','polar-a',1,7,.5,4)}${slider('b','polar-b',0,7,.5,3)}${slider('n','polar-n',1,6,1,3)}${slider('Current θ','polar-theta',0,6.28,.05,0)}</div><div class="graph-canvas-wrap"><canvas class="graph-canvas" data-height="340" aria-label="Interactive polar graph"></canvas></div><p class="review-note" data-readout role="status" aria-live="polite"></p></div>`;
    const canvas=container.querySelector('canvas');
    const runtime=canvasRuntime(canvas,(ctx,width,height)=>{
        const family=container.querySelector('#polar-family').value;
        const params={family,a:Number(container.querySelector('#polar-a').value),b:Number(container.querySelector('#polar-b').value),n:Number(container.querySelector('#polar-n').value),trig:container.querySelector('#polar-trig').value};
        const theta=Number(container.querySelector('#polar-theta').value);
        const scale=Math.min(width,height)/18,cx=width/2,cy=height/2;
        ctx.strokeStyle='#d3cec2';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,cy);ctx.lineTo(width,cy);ctx.moveTo(cx,0);ctx.lineTo(cx,height);ctx.stroke();
        for(let radius=2;radius<=8;radius+=2){ctx.beginPath();ctx.arc(cx,cy,radius*scale,0,Math.PI*2);ctx.stroke();}
        ctx.strokeStyle='#2f695d';ctx.lineWidth=2.4;ctx.beginPath();let started=false;
        for(let i=0;i<=900;i++){const t=Math.PI*2*i/900;const r=polarRadius(t,params);if(!Number.isFinite(r)){started=false;continue;}const point=polarPoint(t,()=>r);const px=cx+point.x*scale,py=cy-point.y*scale;if(!started){ctx.moveTo(px,py);started=true;}else ctx.lineTo(px,py);}ctx.stroke();
        const r=polarRadius(theta,params);if(Number.isFinite(r)){const point=polarPoint(theta,()=>r);ctx.fillStyle='#8a4f32';ctx.beginPath();ctx.arc(cx+point.x*scale,cy-point.y*scale,5,0,Math.PI*2);ctx.fill();container.querySelector('[data-readout]').textContent=`θ=${theta.toFixed(2)} rad, r=${r.toFixed(2)} → (${point.x.toFixed(2)}, ${point.y.toFixed(2)}).`;}
        else container.querySelector('[data-readout]').textContent=`θ=${theta.toFixed(2)} rad gives no real radius for this lemniscate branch.`;
    });
    container.querySelectorAll('input').forEach(input=>input.addEventListener('input',()=>{container.querySelector(`[data-value-for="${input.id}"]`).textContent=input.value;runtime.render();}));
    container.querySelectorAll('select').forEach(select=>select.addEventListener('change',runtime.render));
    return runtime.cleanup;
}
