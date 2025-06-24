"use client";
import { motion } from "framer-motion";

export default function AnimatedBeams() {
  const beams = [
    { initialX: 100, translateX: 100, duration: 5, delay: 0 },
    { initialX: 300, translateX: 300, duration: 7, delay: 1 },
    { initialX: 500, translateX: 500, duration: 6, delay: 2 },
    { initialX: 700, translateX: 700, duration: 8, delay: 3 },
  ];

  return (
    <>
      {beams.map((beam, index) => (
        <motion.div
          key={index}
          className="absolute left-0 top-0 m-auto h-20 w-1 rounded-full bg-gradient-to-t from-blue-500 via-purple-500 to-transparent shadow-lg shadow-blue-500/50"
          animate={{
            translateY: ["-100px", "800px"],
            translateX: [beam.initialX + "px", beam.translateX + "px"],
          }}
          transition={{
            duration: beam.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beam.delay,
          }}
        />
      ))}
    </>
  );
} 