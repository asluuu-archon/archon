"use client";

import { motion } from "framer-motion";

const streams = [
  {
    id: 1,
    top: "12%",
    left: "-20%",
    width: "38vw",
    duration: 12,
    delay: 0,
    direction: 1,
  },
  {
    id: 2,
    top: "27%",
    left: "105%",
    width: "30vw",
    duration: 16,
    delay: 3,
    direction: -1,
  },
  {
    id: 3,
    top: "43%",
    left: "-25%",
    width: "45vw",
    duration: 18,
    delay: 6,
    direction: 1,
  },
  {
    id: 4,
    top: "61%",
    left: "110%",
    width: "35vw",
    duration: 14,
    delay: 1.5,
    direction: -1,
  },
  {
    id: 5,
    top: "78%",
    left: "-18%",
    width: "28vw",
    duration: 20,
    delay: 8,
    direction: 1,
  },
  {
    id: 6,
    top: "90%",
    left: "108%",
    width: "40vw",
    duration: 17,
    delay: 4.5,
    direction: -1,
  },
];

const verticalStreams = [
  {
    id: 1,
    left: "14%",
    duration: 15,
    delay: 2,
  },
  {
    id: 2,
    left: "38%",
    duration: 19,
    delay: 7,
  },
  {
    id: 3,
    left: "67%",
    duration: 17,
    delay: 4,
  },
  {
    id: 4,
    left: "88%",
    duration: 21,
    delay: 9,
  },
];

export default function DataStreams() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          style={{
            top: stream.top,
            left: stream.left,
            width: stream.width,
          }}
          animate={{
            x:
              stream.direction === 1
                ? ["0vw", "145vw"]
                : ["0vw", "-145vw"],
            opacity: [0, 0.65, 0.65, 0],
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 3,
          }}
          className="absolute flex items-center"
        >
          {stream.direction === -1 && (
            <motion.span
              animate={{
                scale: [0.75, 1.35, 0.75],
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-2 w-2 shrink-0 rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(103,232,249,1)]"
            />
          )}

          <div
            className={`h-px flex-1 ${
              stream.direction === 1
                ? "bg-gradient-to-r from-transparent via-cyan-300/45 to-cyan-100"
                : "bg-gradient-to-r from-cyan-100 via-cyan-300/45 to-transparent"
            }`}
          />

          {stream.direction === 1 && (
            <motion.span
              animate={{
                scale: [0.75, 1.35, 0.75],
                opacity: [0.45, 1, 0.45],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-2 w-2 shrink-0 rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(103,232,249,1)]"
            />
          )}
        </motion.div>
      ))}

      {verticalStreams.map((stream) => (
        <motion.div
          key={stream.id}
          style={{
            left: stream.left,
          }}
          animate={{
            y: ["-25vh", "125vh"],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: stream.duration,
            delay: stream.delay,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 5,
          }}
          className="absolute top-0 flex h-[24vh] flex-col items-center"
        >
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-cyan-300/30 to-cyan-100" />

          <motion.span
            animate={{
              scale: [0.7, 1.3, 0.7],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-cyan-100 shadow-[0_0_18px_rgba(103,232,249,1)]"
          />
        </motion.div>
      ))}

      <motion.div
        animate={{
          top: ["-15%", "115%"],
          opacity: [0, 0.13, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-cyan-200/[0.06] to-transparent blur-xl"
      />

      <motion.div
        animate={{
          left: ["-15%", "115%"],
          opacity: [0, 0.08, 0],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "linear",
          delay: 4,
        }}
        className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-cyan-200/[0.05] to-transparent blur-xl"
      />
    </div>
  );
}