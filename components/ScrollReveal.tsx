import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: 'fit-content' | '100%';
    delay?: number;
    className?: string;
}

export const ScrollReveal = ({ children, width = 'fit-content', delay = 0, className = '' }: ScrollRevealProps) => {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className} style={{ width }}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: delay,
            }}
            style={{ width }}
        >
            {children}
        </motion.div>
    );
};
