// File: app/components/ProductSuiteScene.js - FINAL MASTERPIECE VERSION

'use client';

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './productSuiteScene.css';

gsap.registerPlugin(ScrollTrigger);

// Data Definitions
const allBoxes = [ { id: 'billing', label: 'Billing', color: '#f59e0b', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'invoicing', label: 'Invoicing', color: '#f59e0b', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke="currentColor" strokeWidth="1.5" fill="none"/><rect x="8" y="2" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg> }, { id: 'connect', label: 'Connect', color: '#2563eb', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'terminal', label: 'Terminal', color: '#10b981', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="m9 12 3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'payments', label: 'Payments', color: '#7c3aed', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2Z" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'capital', label: 'Capital', color: '#22c55e', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><rect x="3" y="12" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'treasury', label: 'Treasury', color: '#06b6d4', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M8 14h8M8 10h8m-4 8V6" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M3 20V4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H7l-4 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }, { id: 'issuing', label: 'Issuing', color: '#8b5cf6', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" /><circle cx="8" cy="15" r="1.5" fill="currentColor" /></svg> }, { id: 'radar', label: 'Radar', color: '#ef4444', Icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg> }];
const animationPairs = [{ from: 'payments', to: 'billing', gradient: ['#7c3aed', '#f59e0b'] },{ from: 'radar', to: 'issuing', gradient: ['#ef4444', '#8b5cf6'] },{ from: 'capital', to: 'terminal', gradient: ['#22c55e', '#10b981'] },{ from: 'treasury', to: 'payments', gradient: ['#06b6d4', '#7c3aed'] }];

// Presentational Component
const ProductBlock = React.forwardRef(({ id, children, icon, color }, ref) => (
    <div id={id} ref={ref} className="product-block is-inactive" style={{ '--product-color': color }}>
        <div className="icon-container">{icon({ color })}</div>
        <span className="product-label">{children}</span>
    </div>
));
ProductBlock.displayName = 'ProductBlock';

// Main Scene Component
const ProductSuiteScene = () => {
    const containerRef = useRef(null);
    const boxRefs = useRef({});
    const [paths, setPaths] = useState([]);

    useLayoutEffect(() => {
        const computePaths = () => {
            if (!containerRef.current) return;
            const containerRect = containerRef.current.getBoundingClientRect();
            const newPaths = animationPairs.map(pair => {
                const fromEl = boxRefs.current[pair.from]; const toEl = boxRefs.current[pair.to];
                if (!fromEl || !toEl) return null;
                const fromRect = fromEl.getBoundingClientRect(); const toRect = toEl.getBoundingClientRect();
                const startPoint = { x: fromRect.left - containerRect.left + fromRect.width / 2, y: fromRect.top - containerRect.top + fromRect.height / 2 };
                const endPoint = { x: toRect.left - containerRect.left + toRect.width / 2, y: toRect.top - containerRect.top + toRect.height / 2 };
                const d = `M ${startPoint.x},${startPoint.y} C ${(startPoint.x + endPoint.x)/2},${startPoint.y} ${(startPoint.x + endPoint.x)/2},${endPoint.y} ${endPoint.x},${endPoint.y}`;
                return { id: `${pair.from}-${pair.to}`, d, gradient: pair.gradient };
            }).filter(Boolean);
            setPaths(newPaths);
        };
        const timeoutId = setTimeout(computePaths, 100);
        const ro = new ResizeObserver(computePaths);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => { clearTimeout(timeoutId); ro.disconnect(); };
    }, []);

    useEffect(() => {
        if (paths.length === 0) return;
        
        let ctx = gsap.context(() => {
            let masterTimeline = gsap.timeline({
                repeat: -1, repeatDelay: 2,
                scrollTrigger: { trigger: containerRef.current, start: "top center", toggleActions: "play pause resume pause" }
            });
            masterTimeline.to(".product-block", { autoAlpha: 1, duration: 0.5, stagger: 0.05 });
            paths.forEach(pathInfo => {
                const fromBox = boxRefs.current[pathInfo.id.split('-')[0]]; const toBox = boxRefs.current[pathInfo.id.split('-')[1]];
                const pathBg = document.getElementById(`path-bg-${pathInfo.id}`); const pathDash = document.getElementById(`path-dash-${pathInfo.id}`);
                if (!fromBox || !toBox || !pathBg || !pathDash) return;
                const pathLength = pathBg.getTotalLength();
                gsap.set(pathBg, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
                
                const pairTl = gsap.timeline();
                pairTl.set([fromBox, toBox], { zIndex: 20 })
                    .to([fromBox, toBox], { className: '+=is-active' })
                    .to(pathBg, { strokeDashoffset: 0, duration: 3.0, ease: 'power1.inOut' })
                    .to(toBox, { className: '+=is-glowing' }, "-=0.5")
                    .fromTo(pathDash, { autoAlpha: 1, strokeDashoffset: pathLength * 0.99 }, { strokeDashoffset: pathLength * -0.99, duration: 1.5, ease: 'linear' })
                    .to([pathDash, pathBg, fromBox, toBox], { autoAlpha: 0.5, duration: 0.5 }, ">-0.5") // Gracefully fade out
                    .set(pathBg, { strokeDashoffset: pathLength }) // Reset path
                    .to([fromBox, toBox], { className: '-=is-active' });
                masterTimeline.add(pairTl, ">");
            });
        }, containerRef);
        
        return () => ctx.revert();
    }, [paths]);

    return (
        <div ref={containerRef} className="animation-stage">
            <div className="background-grid">
                {allBoxes.map(box => (
                    <div key={`bg-${box.id}`} className="grid-box"></div>
                ))}
            </div>
            <svg className="svg-path-overlay" viewBox="0 0 900 650">
                <defs>{paths.map(p=>(<linearGradient key={`grad-${p.id}`}id={`grad-${p.id}`}x1="0%"y1="0%"x2="100%"y2="0%"><stop offset="0%"stopColor={p.gradient[0]}/><stop offset="100%"stopColor={p.gradient[1]}/></linearGradient>))}</defs>
                {paths.map(p=>(<g key={p.id}><path id={`path-bg-${p.id}`}className="path-background"d={p.d}/><path id={`path-dash-${p.id}`}className="path-dash"d={p.d}stroke={`url(#grad-${p.id})`}/></g>))}
            </svg>
            {allBoxes.map(box => (
                <ProductBlock key={box.id} id={box.id} ref={el => boxRefs.current[box.id] = el} icon={box.Icon} color={box.color}>{box.label}</ProductBlock>
            ))}
        </div>
    );
};

export default ProductSuiteScene;