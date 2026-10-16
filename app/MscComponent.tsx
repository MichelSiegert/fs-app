'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoffeeStatus from './CoffeeStatus';
import { MensaComponent } from './MensaComponent';

export default function MscComponent() {
    const [showCoffee, setShowCoffee] = useState(false);

    return (
        <div className="w-full">
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {showCoffee ? (
                        <motion.div
                            key="coffee"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full flex "
                        >
                            <CoffeeStatus />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="component2"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className=" w-full flex"
                        >
                            <MensaComponent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}