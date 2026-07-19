import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-white
      "
    >
      <div className="flex flex-col items-center">

        {/* Spinner */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="
            h-16
            w-16
            rounded-full
            border-4
            border-gray-200
            border-t-blue-600
          "
        />

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
          }}
          className="mt-6 text-lg font-semibold"
        >
          Loading...
        </motion.h2>

      </div>
    </motion.div>
  );
}