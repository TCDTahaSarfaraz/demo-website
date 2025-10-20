// File: app/components/ProductSuiteScene.js - THE DEFINITIVE, FLAWLESS VERSION

'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ProductSuiteScene.css';

gsap.registerPlugin(ScrollTrigger);

// --- A robust hook to check for screen size ---
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        listener();
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [query]);
    return matches;
};

// --- DATA & SVG DEFINITIONS ---
const allBoxesData = [
    { id: 'billing', label: 'Billing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Z" /><path d="M14 2v6h6"/></svg> },
    { id: 'invoicing', label: 'Invoicing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg> },
    { id: 'connect', label: 'Connect', color: '#4f46e5', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M12 5v14M5 12h14"/></svg> },
    { id: 'terminal', label: 'Terminal', color: '#10b981', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m9 12 3 3 3-3"/></svg> },
    { id: 'payments', label: 'Payments', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2Z"/><path d="M4 10h16"/></svg> },
    { id: 'capital', label: 'Capital', color: '#22c55e', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><rect x="3" y="12" width="18" height="8" rx="2"/><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2"/></svg> },
    { id: 'treasury', label: 'Treasury', color: '#06b6d4', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M8 14h8M8 10h8m-4 8V6"/><path d="M3 20V4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H7l-4 4Z"/></svg> },
    { id: 'issuing', label: 'Issuing', color: '#8b5cf6', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="15" r="1.5"/></svg> },
    { id: 'radar', label: 'Radar', color: '#ef4444', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1"/><circle cx="12" cy="12" r="3"/></svg> },
    { id: 'tax', label: 'Tax', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" width="24" height="24" {...p}><path d="M9 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7.5 16.83 7.5 16s.67-1.5 1.5-1.5M15 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5M16 8H8v4h8V8Zm4-4h-2V2h-2v2H8V2H6v2H4v16h16V4Z" fill="currentColor"/></svg> }
];
const animationPairsData = [
    { from: 'billing', to: 'invoicing', gradient: ['#fde047', '#f59e0b'], curve: false },
    { from: 'invoicing', to: 'connect', gradient: ['#f59e0b', '#4f46e5'], curve: false },
    { from: 'connect', to: 'terminal', gradient: ['#4f46e5', '#10b981'], curve: false },
    { from: 'terminal', to: 'payments', gradient: ['#10b981', '#7c3aed'], curve: false },
    { from: 'payments', to: 'capital', gradient: ['#7c3aed', '#22c55e'], curve: false },
    { from: 'capital', to: 'issuing', gradient: ['#22c55e', '#8b5cf6'], curve: false },
    { from: 'issuing', to: 'radar', gradient: ['#8b5cf6', '#ef4444'], curve: false },
    { from: 'radar', to: 'tax', gradient: ['#ef4444', '#7c3aed'], curve: false },
    { from: 'tax', to: 'treasury', gradient: ['#7c3aed', '#06b6d4'], curve: false }
];

// --- ARCHITECTURALLY CORRECT SUB-COMPONENTS ---
const ProductNode = React.forwardRef(({ id, children, Icon, color }, ref) => (
    <div id={id} ref={ref} className="product-node" style={{ '--product-color': color }}>
        <div className="product-box"><div className="icon-container"><Icon /></div></div>
        <span className="product-label">{children}</span>
    </div>
));
ProductNode.displayName = 'ProductNode';
const ProductBlockMobile = ({ id, children, Icon, color }) => (
    <div id={id} className="product-block-mobile">
        <div className="icon-container-mobile" style={{'--product-color': color}}><Icon /></div>
        <span className="product-label-mobile">{children}</span>
    </div>
);

// --- 1. THE DESKTOP ANIMATION COMPONENT ---
const DesktopAnimation = () => {
    const containerRef = useRef(null);
    const boxRefs = useRef({});
    const [paths, setPaths] = useState([]);
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    
    useLayoutEffect(() => {
        if (!containerRef.current) return;
        const computePaths = () => {
            const containerRect = containerRef.current.getBoundingClientRect();
            setSvgSize({ width: containerRect.width, height: containerRect.height });
            const newPaths = animationPairsData.map(pair => {
                const fromEl = boxRefs.current[pair.from]?.querySelector('.product-box');
                const toEl = boxRefs.current[pair.to]?.querySelector('.product-box');
                if (!fromEl || !toEl) return null;
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();
                const startPoint = { x: fromRect.left - containerRect.left + fromRect.width / 2, y: fromRect.top - containerRect.top + fromRect.height / 2 };
                const endPoint = { x: toRect.left - containerRect.left + toRect.width / 2, y: toRect.top - containerRect.top + toRect.height / 2 };
                const controlPointOffset = pair.curve !== false ? (endPoint.x - startPoint.x) / 2 : 0;
                const d = pair.curve !== false
                    ? `M ${startPoint.x},${startPoint.y} C ${startPoint.x + controlPointOffset},${startPoint.y} ${endPoint.x - controlPointOffset},${endPoint.y} ${endPoint.x},${endPoint.y}`
                    : `M ${startPoint.x},${startPoint.y} L ${endPoint.x},${endPoint.y}`;
                return { id: `${pair.from}-${pair.to}`, d, gradient: pair.gradient };
            }).filter(Boolean);
            setPaths(newPaths);
        };
        const timeoutId = setTimeout(computePaths, 50);
        const ro = new ResizeObserver(computePaths); ro.observe(containerRef.current);
        return () => { clearTimeout(timeoutId); ro.disconnect(); };
    }, []);

    useEffect(() => {
        if (paths.length === 0 || svgSize.width === 0) return;
        let ctx = gsap.context(() => {
            gsap.fromTo(".product-node", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: containerRef.current, start: "top center", toggleActions: "play none none none", once: true } });
            
            const drawDuration = 1.5;
            const holdDuration = 0.5;
            const fadeDuration = 0.2;
            const loopTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
            let currentIndex = 0;

            function animatePath(index) {
                if (index >= paths.length) return;
                const pathInfo = paths[index];
                const pair = animationPairsData[index];
                const fromNode = boxRefs.current[pair.from];
                const toNode = boxRefs.current[pair.to];
                const pathDash = document.getElementById(`path-dash-${pathInfo.id}`);
                if (!pathDash || !fromNode || !toNode) return;

                const pathLength = pathDash.getTotalLength();
                gsap.set(pathDash, { strokeDasharray: pathLength, strokeDashoffset: pathLength, autoAlpha: 0 });

                loopTimeline
                    .call(() => fromNode.classList.add('is-glowing'))
                    .fromTo(pathDash, { autoAlpha: 1, strokeDashoffset: pathLength }, { strokeDashoffset: 0, duration: drawDuration, ease: 'none' })
                    .call(() => toNode.classList.add('is-glowing'))
                    .to(pathDash, { autoAlpha: 0, duration: fadeDuration }, `+=${holdDuration}`)
                    .call(() => { fromNode.classList.remove('is-glowing'); toNode.classList.remove('is-glowing'); })
                    .set(pathDash, { strokeDashoffset: pathLength })
                    .call(() => animatePath(index + 1), [], "+=0");
            }

            animatePath(0);
        }, containerRef);
        return () => ctx.revert();
    }, [paths, svgSize]);

    return (
        <div ref={containerRef} className="animation-stage">
            <svg className="svg-path-overlay" viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}>
                <defs>{paths.map(p=>(<linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`}><stop offset="0%" stopColor={p.gradient[0]} /><stop offset="100%" stopColor={p.gradient[1]} /></linearGradient>))}</defs>
                {paths.map(p=>(<g key={p.id}><path id={`path-dash-${p.id}`} d={p.d} className="path-dash" stroke={`url(#grad-${p.id})`} /></g>))}
            </svg>
            {allBoxesData.map(box => (
                <ProductNode key={box.id} id={box.id} ref={el => boxRefs.current[box.id] = el} Icon={box.Icon} color={box.color}>{box.label}</ProductNode>
            ))}
        </div>
    );
};

// --- 2. THE MOBILE GRID COMPONENT ---
const MobileGrid = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        gsap.from(".product-block-mobile", {
            autoAlpha: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play none none none" }
        });
    }, []);
    return (<div ref={containerRef} className="product-grid-mobile">{allBoxesData.map(box => (<ProductBlockMobile key={box.id} {...box} />))}</div>);
};

// --- 3. THE PARENT COMPONENT THAT SWITCHES BETWEEN VIEWS ---
const ProductSuiteScene = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true) }, []);
    
    if (!isClient) return <div className="animation-placeholder" />;
    return isDesktop ? <DesktopAnimation /> : <MobileGrid />;
};

export default ProductSuiteScene;