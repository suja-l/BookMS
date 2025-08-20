import React from "react";
import "animate.css";
import { motion, AnimatePresence } from "framer-motion";

import "../Components/Modal.css";
export const revealVariants = {
  // Variants for the main backdrop/overlay
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  // Variants for the modal container
  modal: {
    hidden: {
      opacity: 0,
      borderRadius: "100%",
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      borderRadius: "16px",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        when: "beforeChildren", // Animate this container *before* its children
        staggerChildren: 1, // Delay between each child's animation
      },
    },
    exit: {
      opacity: 0,
      borderRadius: "100%",
      scale: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  },
  child: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { type: "tween", ease: "easeIn" } }, // <-- ADDED THIS LINE
  },
};
export default function CustomModal({ show, onClose, children }) {
  // eslint-disable-next-line

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            id="customModal"
            layout
            className={`modal fade show glass-modal`}
            tabIndex="-1"
            onClick={onClose}
            variants={revealVariants.backdrop}
            initial="backdrop_hidden"
            animate="backdrop_visible"
            exit="backdrop_hidden"
          >
            <motion.div
              style={{
                width: "550px",
                maxWidth: "90vw",
                height: "fit-content",
              }}
              onClick={(e) => e.stopPropagation()}
              variants={revealVariants.modal}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="modal-content">{children}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
CustomModal.Header = ({ children, className, style = {}, ...rest }) => {
  return (
    <div className={`modal-header ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};
CustomModal.Body = ({ children, className, style = {}, ...rest }) => {
  return (
    <div
      className={`modal-body d-flex flex-column ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

CustomModal.Footer = ({ children, className, style = {}, ...rest }) => {
  return (
    <div className={`modal-footer ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
};
