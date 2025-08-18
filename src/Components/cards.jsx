import React from "react";
import { motion } from "framer-motion";
import Badges from "./badges";

export function Cards({ movie, Editbtn, Delbtn, children }) {
  if (movie) {
    const cardStyle = {
      background: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
      backdropFilter: "blur(100px)",
      border: "1px solid rgba(255, 255, 255, 0)",
      borderRadius: "20px", // Rounded corners
    };
    return (
      <motion.div
        className="col-md-3 mb-4 d-flex"
        layout
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 0.9, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ duration: 0.6 }}
        style={{ background: "transparent", borderRadius: "20px" }}
      >
        <div
          className="card h-100 w-100  card-3d-effect d-flex flex-column text-light"
          style={cardStyle}
        >
          <img
            src={movie.posterURL}
            className="card-img-top"
            alt="Poster Preview"
            style={{
              height: "300px",
              objectFit: "cover",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />
          <div className="card-body d-flex flex-column p-3">
            <h6 className="card-title text-uppercase text-info fw-bold pb-2 text-center">
              {movie.movie}
            </h6>
            <p
              className="card-text small flex-grow-1"
              style={{ color: "#ccc" }}
              title={movie.description}
            >
              {movie.description?.length > 80
                ? movie.description.slice(0, 80) + "..."
                : movie.description}
            </p>
            <div className="card-metadata mt-auto">
              <div className="d-flex flex-column justify-content-between small mb-2">
                <span>
                  <strong className="card-metadata-label">Genre: </strong>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {movie.genre}
                </span>
                <span>
                  {" "}
                  <strong className="card-metadata-label">Duration:</strong>
                  &nbsp;&nbsp;&nbsp;
                  {movie.duration} mins
                </span>
              </div>
              <div className="mb-2">
                <strong className="small card-metadata-label">
                  Languages:
                </strong>
                <br />
                <Badges items={movie.languages} className={"bg-info"} />
              </div>
              <div className="mb-2">
                <strong className="small card-metadata-label">Types:</strong>
                <br />
                <Badges items={movie.types} className={"bg-primary-subtle"} />
              </div>
            </div>
          </div>

          <div
            className="card-footer border-0 d-flex justify-content-between"
            style={{
              background: "transparent",
              borderTop: "1px solid rgba(255,255,255,0.1",
            }}
          >
            {Editbtn} {Delbtn}
          </div>
        </div>
      </motion.div>
    );
  } else {
    return <div>{children}</div>;
  }
}
