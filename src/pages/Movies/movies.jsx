import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../../Components/Modal.css";

import {
  CloseModal,
  DeleteButton,
  EditButton,
  InputField,
  SaveModal,
} from "../../Components/Button";
import CustomModal, { revealVariants } from "../../Components/Modal";
import CardList from "../../Components/cardList";
import { Cards } from "../../Components/cards";
import Badges from "../../Components/badges";

export default function Movies() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const availableLanguages = ["English", "Hindi", "Kannada", "Telugu", "Tamil"];
  const availableTypes = ["2D", "3D", "4DX", "Dolby", "Dolby atmos"];
  // eslint-disable-next-line
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };
  const [formState, setFormState] = useState({
    movie: "",
    genre: "",
    description: "",
    posterURL: "",
    duration: "",
    languages: [],
    types: [],
  });

  //  Handle input changes for text, textarea, url, number
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetform = () => {
    setFormState({
      movie: "",
      genre: "",
      description: "",
      posterURL: "",
      duration: "",
      languages: [],
      types: [],
    });
  };
  //  Handle checkbox toggling for languages and types
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter((item) => item !== value)
        : [...prev[name], value],
    }));
  };

  const handleAddMovie = (e) => {
    e.preventDefault();
    const { movie, genre, languages, types, description, posterURL, duration } =
      formState;

    if (
      !movie ||
      !genre ||
      !languages.length ||
      !types.length ||
      !description ||
      !posterURL ||
      !duration
    ) {
      return alert("Please fill all the fields");
    }

    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    if (editIndex !== null) {
      stored[editIndex] = { ...stored[editIndex], ...formState };
    } else {
      const newMovie = {
        id: Date.now().toString(36),
        ...formState,
      };
      stored.push(newMovie);
    }

    setMovies(stored);
    localStorage.setItem("movies", JSON.stringify(stored));

    // Reset form
    resetform();
    setIsEditMode(false);
    setEditIndex(null);
    setShowModal(false);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(stored);
  }, []);

  return (
    <>
      {/*  Display Section */}
      <div className="container d-grid">
        <div className="sticky-page-header">
          <h1 className="page-title">Movies</h1>
          <hr className="title-separator" />
        </div>

        <div className="row">
          <AnimatePresence>
            <CardList
              add={true}
              page="Movie"
              items={movies}
              onAddClick={() => {
                setIsEditMode(false);
                resetform();
                setShowModal(true);
              }}
            >
              {(movie, index) => (
                <Cards
                  key={movie.id}
                  title={movie.movie}
                  imageUrl={movie.posterURL}
                  Editbtn={
                    <EditButton
                      className="btn card-action-btn button-3d-effect"
                      onClick={() => {
                        setIsEditMode(true);
                        setEditIndex(index);
                        setFormState(movie);
                        setShowModal(true);
                      }}
                    />
                  }
                  Delbtn={
                    <DeleteButton
                      item={movie}
                      data={movies}
                      setData={setMovies}
                      storageKey="movies"
                      className="card-action-btn button-3d-effect"
                    />
                  }
                >
                  {/* This content gets passed as 'children' to the card body */}
                  <div className="d-flex flex-column gap-1">
                    <div className="d-flex justify-content-between small">
                      <span>
                        <strong className="card-metadata-label">Genre:</strong>{" "}
                        {movie.genre}
                      </span>
                      <span>
                        <strong className="card-metadata-label">
                          Duration:
                        </strong>{" "}
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
                    <div>
                      <strong className="small card-metadata-label">
                        Types:
                      </strong>
                      <br />
                      <Badges
                        items={movie.types}
                        className={"bg-primary-subtle"}
                      />
                    </div>
                  </div>
                </Cards>
              )}
            </CardList>
          </AnimatePresence>{" "}
        </div>
      </div>
      <form onSubmit={handleAddMovie}>
        <CustomModal show={showModal} onClose={() => setShowModal(false)}>
          <motion.div variants={revealVariants.child} exit="exit">
            <CustomModal.Header>
              <h1 className="modal-title fs-5" id="exampleModal2Label">
                {isEditMode ? "Edit Movie" : "Add Movie"}
              </h1>
              <button
                type="button"
                id="modal-close-button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </CustomModal.Header>{" "}
          </motion.div>
          <motion.div variants={revealVariants.child} exit="exit">
            <CustomModal.Body>
              <div className="row">
                {/* Movie Name */}
                <div className="col-md-7">
                  <div className="mb-3">
                    <InputField
                      label="Movie Name:"
                      inputType="text"
                      inputPlaceholder="Enter Movie Name"
                      name="movie"
                      value={formState.movie}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    {/* Description */}
                    <label className="form-label"></label>
                    <InputField
                      label={"Movie Description:"}
                      inputType="textarea"
                      as="textarea"
                      rows="6"
                      inputPlaceholder="Type Movie Description here..."
                      name="description"
                      value={formState.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    {/* Poster URL */}
                    <InputField
                      inputType="url"
                      inputPlaceholder="https://example.com/poster.jpg"
                      name="posterURL"
                      value={formState.posterURL}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <div
                      style={{
                        minHeight: "150px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f8f9fa79",
                        marginTop: "8px",
                      }}
                    >
                      {formState.posterURL ? (
                        <img
                          src={formState.posterURL}
                          alt="Poster Preview"
                          className="img-fluid"
                          style={{ maxHeight: "150px", objectFit: "contain" }}
                        />
                      ) : (
                        <span style={{ color: "#999" }}>
                          Poster preview will appear here
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-3">
                    {/* Genre */}
                    <label className="form-label">
                      <h5>Genre:</h5>
                    </label>
                    <InputField
                      inputType="text"
                      inputPlaceholder="Enter genre separated by '/'"
                      name="genre"
                      value={formState.genre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    {/* Duration */}
                    <InputField
                      inputType="number"
                      min="0"
                      inputPlaceholder="Enter Duration (e.g., 120 mins)"
                      name="duration"
                      value={formState.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-5 tag-button-group">
                  <div className="mb-3">
                    <label className="form-label">
                      <h5>Languages:</h5>
                    </label>
                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                      style={{ width: "80%" }}
                    >
                      {/* Languages */}
                      {availableLanguages.map((lang) => (
                        <React.Fragment key={lang}>
                          <input
                            type="checkbox"
                            className="btn-check"
                            id={`btn-check-${lang}`}
                            autoComplete="off"
                            name="languages"
                            value={lang}
                            checked={formState.languages.includes(lang)}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="btn tag-button"
                            htmlFor={`btn-check-${lang}`}
                          >
                            {" "}
                            {lang}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      <h5>Movie Type:</h5>
                    </label>
                    <div
                      className="btn-group-vertical"
                      role="group"
                      aria-label="Vertical button group"
                      style={{ width: "80%" }}
                    >
                      {/* Movie Types */}
                      {availableTypes.map((type) => (
                        <React.Fragment key={type}>
                          <input
                            type="checkbox"
                            className="btn-check px-0"
                            id={`btn-check-${type}`}
                            name="types"
                            value={type}
                            checked={formState.types.includes(type)}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            className="btn btn-outline-primary w-100 px-1"
                            htmlFor={`btn-check-${type}`}
                          >
                            {type}
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CustomModal.Body>{" "}
          </motion.div>
          <motion.div variants={revealVariants.child} exit="exit">
            <CustomModal.Footer>
              <CloseModal
                color="btn-secondary"
                onClick={() => setShowModal(false)}
              />
              <SaveModal type="submit" color="btn-primary" />
            </CustomModal.Footer>{" "}
          </motion.div>
        </CustomModal>{" "}
      </form>
    </>
  );
}
