"use client";
import { motion } from "motion/react";
import Link from 'next/link';

export type ButtonVariant = "white" | "black" | "whiteFill" | "blackFill" | "red";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
}

const Button = ({
  children,
  href,
  onClick,
  variant = 'white',
  className,
  type = "button",
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-12 py-3 rounded-md font-medium transition-colors disabled:opacity-50 cursor-pointer";
  const variants = {
    white: "bg-transparent text-black border-1",
    black: "bg-transparent text-black border-1",
    red: "bg-red-50 text-red-700 border-1 border-red-200 hover:bg-red-100",
    whiteFill: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black",
    blackFill: "bg-black/90 text-white hover:text-white/90 hover:bg-black/95",
  };
  const fullClassName = `${baseStyles} ${variants[variant]} ${className}`.trim();
  const motionProps = {
    whileHover: { 
      scale: 1.02,
      transition: { duration: 0.2 } 
    },
    whileTap: { 
      scale: 0.95 
    },
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };
  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block"> 
        <Link href={href} className={fullClassName}>
          {children}
        </Link>
      </motion.div>
    );
  };

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      className={fullClassName}
    >
      {children}
    </motion.button>
  )
}

export default Button