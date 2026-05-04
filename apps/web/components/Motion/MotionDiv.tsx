"use client";
import { motion } from "motion/react";
import { animations } from "../../lib/data";

type AnimationType = keyof typeof animations;

interface MotionDivProps {
  children: React.ReactNode;
  variant?: AnimationType;
  delay?: number;
  className?: string;
}

const MotionDiv = ({ 
  children, 
  variant = "fadeUp", 
  delay = 0, 
  className 
}: MotionDivProps) => {
  return (
    <motion.div
        initial={animations[variant].initial}
        whileInView={animations[variant].animate}
        viewport={{ once: true }}
        transition={{ 
            duration: 0.5, 
            delay: delay, 
            ease: "easeOut" 
        }}
        className={className}>
        {children}
    </motion.div>
  )
}

export default MotionDiv