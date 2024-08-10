import React from "react";
import { motion } from "framer-motion";

import "./LoadingPage.scss";

const LoadingPage = () => {
  return (
    <motion.div
      className="loading-page"
      exit={{
        opacity: 0,
        transition: { delay: 0.5, duration: 0.3 },
      }}
      transition={{ duration: 0.3 }}
    >
      <h2>Muvi</h2>
    </motion.div>
  );
};

export default LoadingPage;
