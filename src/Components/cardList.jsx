import { AnimatePresence } from "framer-motion";
// import { Cards } from "./cards";
import { motion } from "framer-motion";

export default function CardList({
  items,
  children,
  // renderEdit,
  // renderDelete,
  onAddClick,
}) {
  if (!items || items.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div
      className="card-list"
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginRight: "3px",
        perspective: "1000px",
      }}
    >
      <AnimatePresence>
        {items.map((item, index) => children(item, index))}
        <motion.div
          className="col-md-3 mb-4"
          key="add-movie"
          layout
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 0.9, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <div
            className="card h-100 w-100 shadow-lg d-flex flex-column text-light "
            style={{
              backgroundColor: "transparent",
              border: "2px dashed green",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <div className="card-body p-2 gap-2 flex-grow-1 text-center">
              <h5 className="card-title text-uppercase fw-bold text-center mt-0">
                New Movie
              </h5>
              <div className="h-100 d-flex flex-column justify-content-center align-items-center">
                <button
                  type="button"
                  className="btn btn-primary px-3"
                  onClick={onAddClick}
                >
                  Add Movie
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
