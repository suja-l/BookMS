import React from "react";
import { motion } from "framer-motion";

export function Cards({
  title,
  subtitle,
  imageUrl,
  children,
  Editbtn,
  Delbtn,
}) {
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(100px)",
    border: "1px solid rgba(255, 255, 255, 0)",
    borderRadius: "20px",
  };

  return (
    <motion.div
      className="col-md-3 mb-4 d-flex"
      layout
      // ... animation props ...
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 0.9, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.6 }}
      style={{ background: "transparent", borderRadius: "20px" }}
    >
      <div
        className="card h-100 w-100 card-3d-effect d-flex flex-column text-light"
        style={cardStyle}
      >
        <img
          src={imageUrl || "https://via.placeholder.com/400x600?text=No+Image"}
          className="card-img-top"
          alt="Card visual"
          style={{
            height: "300px",
            objectFit: "cover",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        />
        <div className="card-body d-flex flex-column p-3">
          {title && (
            <h6 className="card-title text-uppercase text-info fw-bold pb-2 text-center">
              {title}
            </h6>
          )}
          {subtitle && (
            <p
              className="card-subtitle text-center small"
              style={{ color: "#ccc" }}
            >
              {subtitle}
            </p>
          )}
          <div className="card-metadata mt-auto pt-3">{children}</div>
        </div>
        {(Editbtn || Delbtn) && (
          <div
            className="card-footer border-0 d-flex justify-content-between"
            style={{
              background: "transparent",
              borderTop: "1px solid rgba(255,255,255,0.1",
            }}
          >
            {Editbtn} {Delbtn}
          </div>
        )}
      </div>
    </motion.div>
  );
}
