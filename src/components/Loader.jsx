import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="loader">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, loop: Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default Loader;
