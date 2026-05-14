import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const step = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(step);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + Math.random() * 18 + 4;
      });
    }, 90);
    return () => clearInterval(step);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0f172a" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <h1
              className="text-4xl md:text-5xl font-display font-bold mb-2"
              style={{ color: "#f1f5f9" }}
            >
              A.Shafiq Ahamed
            </h1>
            <p
              className="font-mono text-sm tracking-[0.3em] uppercase"
              style={{ color: "#60a5fa" }}
            >
              AI &amp; Data Science Engineer
            </p>
          </motion.div>

          {/* Spinner */}
          <motion.div
            className="w-12 h-12 rounded-full mb-8"
            style={{
              border: "2px solid rgba(255,255,255,0.08)",
              borderTopColor: "#3b82f6",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Progress bar */}
          <div
            className="w-64 md:w-80 h-0.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#3b82f6" }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p
            className="mt-3 font-mono text-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
