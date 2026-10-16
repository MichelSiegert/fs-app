/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoffeeStatus from './CoffeeStatus';
import { MensaComponent } from './MensaComponent';

export default function MscComponent() {
    const [showCoffee, setShowCoffee] = useState(true);

    useEffect(() => {
        const isWithinMensaHours = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            const totalMinutes = hours * 60 + minutes;

            const startTime = 10 * 60;
            const endTime = 14 * 60;

            return totalMinutes >= startTime && totalMinutes < endTime;
        };

        if (!isWithinMensaHours()) {
            setShowCoffee(true);
        }

        const interval = setInterval(() => {
            if (isWithinMensaHours()) {
                setShowCoffee((prev) => !prev);
            } else {
                setShowCoffee(true);
            }
        }, 45000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-full min-h-full content-center">
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {showCoffee ? (
                        <motion.div
                            key="coffee"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="w-full flex justify-center "
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