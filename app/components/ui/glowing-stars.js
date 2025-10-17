"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn"; // Assuming you have a cn utility for classnames

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={cn(
        "bg-[linear-gradient(110deg,#333_0.6%,#222)] p-4 max-w-md w-full h-full rounded-xl border border-[#eaeaea] dark:border-neutral-600",
        className
      )}
    >
      <div className="flex justify-center items-center">
        <Illustration mouseEnter={mouseEnter} />
      </div>
      <div className="px-2 pb-6">{children}</div>
    </div>
  );
};

export const GlowingStarsTitle = ({
  className,
  children,
}) => {
  return (
    <h2 className={cn("font-bold text-2xl text-[#eaeaea] dark:text-neutral-200", className)}>
      {children}
    </h2>
  );
};

export const GlowingStarsDescription = ({
  className,
  children,
}) => {
  return (
    <p className={cn("text-base text-[#eaeaea] dark:text-neutral-400 mt-2", className)}>
      {children}
    </p>
  );
};

const Illustration = ({ mouseEnter }) => {
  const stars = 108;
  const columns = 18;

  const [glowingStars, setGlowingStars] = useState([]);

  const highlightedStars = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      );
      setGlowingStars([...highlightedStars.current]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="h-48 p-1 w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `1px`,
      }}
    >
      {[...Array(stars)].map((_, i) => {
        const isGlowing = glowingStars.includes(i);
        const highlight = (i % (columns + 1)) - Math.floor(i / columns) * 2 === 0;

        return (
            <div
                key={i}
                className={cn(
                    "relative",
                    "h-1 w-1 rounded-full",
                    !isGlowing && highlight && "bg-neutral-600"
                )}
            >
                <AnimatePresence>
                    {isGlowing && (
                        <motion.div
                            initial={{
                                scale: 0.2,
                                opacity: 0,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}
                            exit={{
                                scale: 1.2,
                                opacity: 0,
                            }}
                            className={cn(
                                "absolute left-0 top-0",
                                "bg-neutral-200 h-full w-full rounded-full"
                            )}
                        ></motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
      })}
    </div>
  );
};

