'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or nothing to avoid SSR hydration mismatch
    return <div className="h-6 w-[36px]"></div>;
  }
  
  const isChecked = theme === 'dark';

  return (
    <form className="flex space-x-2 antialiased items-center">
      <label
        htmlFor="theme-switch"
        className={twMerge(
          "h-7 px-1 flex items-center shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[44px] relative cursor-pointer transition-colors duration-300",
          isChecked ? "bg-cyan-500" : "bg-slate-700"
        )}
      >
        <motion.div
          initial={{ width: "18px", x: isChecked ? 20 : 0 }}
          animate={{
            height: ["18px", "10px", "18px"],
            width: ["18px", "26px", "18px"],
            x: isChecked ? 20 : 0
          }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
          key={String(isChecked)} // Re-trigger animation on change
          className="h-[18px] block rounded-full bg-white shadow-md z-10"
        />
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          className="hidden"
          id="theme-switch"
        />
      </label>
    </form>
  );
};

export default ThemeSwitcher;