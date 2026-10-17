'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    componentKey: string;
    children: React.ReactNode;
}

export function AnimatedCard({ componentKey, children }: Props) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={componentKey}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full flex justify-center h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}