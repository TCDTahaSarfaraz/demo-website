
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
    { id: 'billing', label: 'Billing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Z" /><path d="M14 2v6h6"/></svg> },
    { id: 'invoicing', label: 'Invoicing', color: '#f59e0b', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg> },
    { id: 'tax', label: 'Tax', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M9 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S7.5 16.83 7.5 16s.67-1.5 1.5-1.5M15 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5M16 8H8v4h8V8Zm4-4h-2V2h-2v2H8V2H6v2H4v16h16V4Z" /></svg>, iconType: 'fill' },
    { id: 'connect', label: 'Connect', color: '#4f46e5', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M12 5v14M5 12h14"/></svg> },
    { id: 'issuing', label: 'Issuing', color: '#8b5cf6', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="15" r="1.5"/></svg>, iconType: 'fill' },
    { id: 'payments', label: 'Payments', color: '#7c3aed', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2Z"/><path d="M4 10h16"/></svg> },
    { id: 'capital', label: 'Capital', color: '#22c55e', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="3" y="12" width="18" height="8" rx="2"/><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2"/></svg> },
    { id: 'terminal', label: 'Terminal', color: '#10b981', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="m9 12 3 3 3-3"/></svg> },
    { id: 'radar', label: 'Radar', color: '#ef4444', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1"/><circle cx="12" cy="12" r="3"/></svg> },
    { id: 'treasury', label: 'Treasury', color: '#06b6d4', Icon: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M8 14h8M8 10h8m-4 8V6"/><path d="M3 20V4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H7l-4 4Z"/></svg> },
];

// Updated animation pairs for a more professional and logical flow.
const animationPairsData = [
    { from: 'billing', to: 'invoicing', gradient: ['#f59e0b', '#f59e0b'], curveFactor: 0 },
    { from: 'invoicing', to: 'tax', gradient: ['#f59e0b', '#7c3aed'], curveFactor: 0 },
    { from: 'tax', to: 'payments', gradient: ['#7c3aed', '#7c3aed'], curveFactor: 35 },
    { from: 'payments', to: 'radar', gradient: ['#7c3aed', '#ef4444'], curveFactor: 0 },
    { from: 'radar', to: 'terminal', gradient: ['#ef4444', '#10b981'], curveFactor: -35 },
    { from: 'terminal', to: 'issuing', gradient: ['#10b981', '#8b5cf6'], curveFactor: 0 },
    { from: 'issuing', to: 'connect', gradient: ['#8b5cf6', '#4f46e5'], curveFactor: 0 },
    { from: 'connect', to: 'capital', gradient: ['#4f46e5', '#22c55e'], curveFactor: 0 },
    { from: 'capital', to: 'treasury', gradient: ['#22c55e', '#06b6d4'], curveFactor: 0 },
    // Added user-requested path with a nice curve
    { from: 'invoicing', to: 'connect', gradient: ['#f59e0b', '#4f46e5'], curveFactor: -50 },
];


// --- ARCHITECTURALLY CORRECT SUB-COMPONENTS ---
const ProductNode = React.forwardRef(({ id, children, Icon, color, iconType }, ref) => (
    <div id={id} ref={ref} className={`product-node ${iconType === 'fill' ? 'fill-icon' : ''}`} style={{ '--product-color': color }}>
        <div className="product-box"><div className="icon-container"><Icon /></div></div>
        <span className="product-label">{children}</span>
    </div>
));
ProductNode.displayName = 'ProductNode';

const ProductBlockMobile = ({ id, children, Icon, color, iconType }) => (
    <div id={id} className={`product-block-mobile ${iconType === 'fill' ? 'fill-icon' : ''}`}>
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

            const newPaths = animationPairsData.map((pair) => {
                const fromEl = boxRefs.current[pair.from]?.querySelector('.product-box');
                const toEl = boxRefs.current[pair.to]?.querySelector('.product-box');
                if (!fromEl || !toEl) return null;

                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();

                const fromCenter = { x: fromRect.left - containerRect.left + fromRect.width / 2, y: fromRect.top - containerRect.top + fromRect.height / 2 };
                const toCenter = { x: toRect.left - containerRect.left + toRect.width / 2, y: toRect.top - containerRect.top + toRect.height / 2 };

                const dx = toCenter.x - fromCenter.x;
                const dy = toCenter.y - fromCenter.y;
                
                const boxBuffer = 1.5; // Start path right at the border edge
                let startPoint, endPoint;

                if (Math.abs(dx) > Math.abs(dy)) { // Primarily horizontal
                    startPoint = { x: fromCenter.x + Math.sign(dx) * (fromRect.width / 2 + boxBuffer), y: fromCenter.y };
                    endPoint = { x: toCenter.x - Math.sign(dx) * (toRect.width / 2 + boxBuffer), y: toCenter.y };
                } else { // Primarily vertical
                    startPoint = { x: fromCenter.x, y: fromCenter.y + Math.sign(dy) * (fromRect.height / 2 + boxBuffer) };
                    endPoint = { x: toCenter.x, y: toCenter.y - Math.sign(dy) * (toRect.height / 2 + boxBuffer) };
                }

                let d;
                const curveFactor = pair.curveFactor || 0;

                if (curveFactor === 0) {
                     d = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;
                } else {
                    const midPoint = { x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2 };
                    const vec = { x: endPoint.x - startPoint.x, y: endPoint.y - startPoint.y };
                    const vecLength = Math.sqrt(vec.x ** 2 + vec.y ** 2);
                    const perpVec = { x: -vec.y / vecLength, y: vec.x / vecLength };
                    const controlPoint = { x: midPoint.x + perpVec.x * curveFactor, y: midPoint.y + perpVec.y * curveFactor };
                    d = `M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`;
                }
                
                let gradientCoords = { x1: "0%", y1: "0%", x2: "100%", y2: "0%" };
                if (Math.abs(dy) > Math.abs(dx)) {
                    gradientCoords = dy > 0 ? { x1: "0%", y1: "0%", x2: "0%", y2: "100%" } : { x1: "0%", y1: "100%", x2: "0%", y2: "0%" };
                } else {
                    gradientCoords = dx > 0 ? { x1: "0%", y1: "0%", x2: "100%", y2: "0%" } : { x1: "100%", y1: "0%", x2: "0%", y2: "0%" };
                }

                return { id: `${pair.from}-${pair.to}`, d, gradient: pair.gradient, gradientCoords };
            }).filter(Boolean);

            setPaths(newPaths);
        };
        computePaths();
        const ro = new ResizeObserver(computePaths);
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (paths.length === 0 || svgSize.width === 0) return;
        let ctx = gsap.context(() => {
            gsap.fromTo(".product-node", { autoAlpha: 0, y: 20, scale: 0.9 }, {
                autoAlpha: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out',
                scrollTrigger: { trigger: containerRef.current, start: "top 60%", once: true }
            });

            paths.forEach(p => {
                const pathEl = document.getElementById(`path-dash-${p.id}`);
                if (pathEl) {
                    const len = pathEl.getTotalLength();
                    gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len, autoAlpha: 0 });
                }
            });

            const masterTimeline = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 0.5 });
            
            animationPairsData.forEach((pair, index) => {
                const pathInfo = paths.find(p => p.id === `${pair.from}-${pair.to}`);
                if (!pathInfo) return;

                const pathDash = document.getElementById(`path-dash-${pathInfo.id}`);
                const fromNode = boxRefs.current[pair.from];
                const toNode = boxRefs.current[pair.to];
                if (!pathDash || !fromNode || !toNode) return;
                
                const pathLength = pathDash.getTotalLength();

                masterTimeline
                    .add(() => {
                        Object.values(boxRefs.current).forEach(node => node.classList.remove('is-glowing'));
                        fromNode.classList.add('is-glowing');
                    }, index === 0 ? "+=0.5" : undefined)
                    .set(pathDash, { autoAlpha: 1, strokeDashoffset: pathLength })
                    .to(pathDash, {
                        strokeDashoffset: 0,
                        duration: 1.2,
                        ease: "power2.inOut"
                    })
                    .add(() => {
                        fromNode.classList.remove('is-glowing');
                        toNode.classList.add('is-glowing');
                    }, "-=0.2")
                    .to(pathDash, {
                        autoAlpha: 0,
                        duration: 0.4
                    }, "+=0.3");
            });
            
            masterTimeline.add(() => {
                const lastPair = animationPairsData[animationPairsData.length - 1];
                if (lastPair) {
                    const lastNode = boxRefs.current[lastPair.to];
                    if (lastNode) lastNode.classList.remove('is-glowing');
                }
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 50%",
                onEnter: () => masterTimeline.play(0),
                onLeaveBack: () => masterTimeline.pause(0)
            });

        }, containerRef);
        return () => ctx.revert();
    }, [paths, svgSize]);

    return (
        <div ref={containerRef} className="animation-stage">
            <svg className="svg-path-overlay" viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}>
                <defs>
                    {paths.map(p => (
                        <linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`} {...p.gradientCoords}>
                            <stop offset="0%" stopColor={p.gradient[0]} />
                            <stop offset="100%" stopColor={p.gradient[1]} />
                        </linearGradient>
                    ))}
                </defs>
                {paths.map(p => (
                    <g key={p.id} className="path-group">
                        <path
                            id={`path-dash-${p.id}`}
                            d={p.d}
                            className="path-dash"
                            stroke={`url(#grad-${p.id})`}
                        />
                    </g>
                ))}
            </svg>
            {allBoxesData.map(box => (
                <ProductNode key={box.id} id={box.id} ref={el => boxRefs.current[box.id] = el} {...box}>
                    {box.label}
                </ProductNode>
            ))}
        </div>
    );
};

// --- 2. THE MOBILE GRID COMPONENT ---
const MobileGrid = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        gsap.from(".product-block-mobile", {
            autoAlpha: 0, y: 30, scale: 0.9, stagger: 0.05, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true }
        });
    }, []);
    return (
        <div ref={containerRef} className="product-grid-mobile">
            {allBoxesData.map(box => (
                <ProductBlockMobile key={box.id} {...box} />
            ))}
        </div>
    );
};

// --- 3. THE PARENT COMPONENT THAT SWITCHES BETWEEN VIEWS ---
const ProductSuiteScene = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) return <div className="animation-placeholder" />;
    return isDesktop ? <DesktopAnimation /> : <MobileGrid />;
};

export default ProductSuiteScene;
