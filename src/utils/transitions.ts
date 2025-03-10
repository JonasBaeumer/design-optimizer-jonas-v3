
import { HTMLMotionProps, Variants } from 'framer-motion';

// Fade in animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 1
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { 
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.3
    }
  }
};

// Slide up animation variants
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 28
    }
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: { 
      type: 'tween',
      ease: 'easeOut',
      duration: 0.25
    }
  }
};

// Slide in from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 28
    }
  },
  exit: { 
    opacity: 0, 
    x: -10,
    transition: { 
      type: 'tween',
      ease: 'easeOut',
      duration: 0.25
    }
  }
};

// Staggered children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

// Scale animation for buttons and interactive elements
export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.03,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.98 }
};

// Type for standard motion props with animation variants
export type MotionProps = HTMLMotionProps<'div'> & {
  variants?: Variants;
};
