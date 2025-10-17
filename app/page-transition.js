'use client'

import { motion } from 'framer-motion';

// This is a reusable wrapper that will animate its children.
// It uses a simple "stagger" effect for a professional look.
const PageTransition = ({ children }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Delay children animations until the container is visible
        // and then stagger them by 0.3 seconds.
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start hidden and slightly down
    visible: {
      opacity: 1,
      y: 0, // Animate to full opacity and original position
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // We wrap each child in a motion.div to apply the animation.
  const animatedChildren = React.Children.map(children, child => (
    <motion.div variants={itemVariants}>
      {child}
    </motion.div>
  ));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {animatedChildren}
    </motion.div>
  );
};

export default PageTransition;