import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onFinish }: { onFinish: () => void }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [triggerTransition, setTriggerTransition] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const audio = new Audio('/awaz2.mp3');
    audio.volume = 0.7;

    audio.play().then(() => {
      // Start transition at 3.8s (if audio is 5s and transition is 1.2s)
      const transitionStart = setTimeout(() => {
        setTriggerTransition(true);
      }, 3800);

      // Call onFinish at 5s
      const finishTimer = setTimeout(() => {
        onFinish();
      }, 5000);

      return () => {
        clearTimeout(transitionStart);
        clearTimeout(finishTimer);
        audio.pause();
        audio.currentTime = 0;
      };
    }).catch((err) => {
      console.warn('Audio failed to play:', err);
      // Fallback: still transition
      setTriggerTransition(true);
      setTimeout(onFinish, 1200);
    });
  }, [hasStarted, onFinish]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={triggerTransition ? { y: '-100%' } : {}}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 bg-[#f2f2f2] flex flex-col items-center justify-center z-50 text-black"
    >
      <motion.img
        src="/dleclogo.png"
        alt="DLEC Logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-96 mb-4 object-contain"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6"
      >
        Welcome to DLEC <br />
        DIRECT LINE ENGINEERING CORPORATION
      </motion.div>

      {!hasStarted && (
        <button
          onClick={() => setHasStarted(true)}
          className="px-6 py-3 mt-4 bg-purple-700 text-white rounded-lg text-lg font-medium hover:bg-purple-800 transition-colors"
        >
          Start Experience
        </button>
      )}
    </motion.div>
  );
};

export default Intro;
