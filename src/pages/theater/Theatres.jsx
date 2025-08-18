import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  CloseModal,
  DeleteButton,
  EditButton,
  InputField,
  SaveModal,
  StickyTh,
} from "./../../Components/Button";
import CustomModal from "../../Components/Modal";

export default function Theatres() {
  document.title = "Theatres";
  const theatreNameRef = useRef(null);
  const cityRef = useRef(null);
  const locationRef = useRef(null);
  const screensRef = useRef(null);

  const refs = {
    theatreName: theatreNameRef,
    city: cityRef,
    location: locationRef,
    screens: screensRef,
  };
  const [editIndex, setEditIndex] = useState(null);
  // eslint-disable-next-line
  const [error, setError] = useState({});
  const [theatres, setTheatres] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  // eslint-disable-next-line
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [formState, setFormState] = useState({
    theatreName: "",
    location: "",
    city: "",
    screens: "",
  });
  const resetForm = () => {
    setFormState({
      theatreName: "",
      location: "",
      city: "",
      screens: "",
    });
    setEditIndex(null);
  };

  useEffect(() => {
    const storedtheatres = JSON.parse(localStorage.getItem("theatres")) || [];
    setTheatres(storedtheatres);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTheatre = (e) => {
    setError({});

    e.preventDefault();

    // Find first empty field
    const firstEmptyField = Object.entries(formState).find(
      ([key, value]) => !value || value.toString().trim() === ""
    );

    if (firstEmptyField) {
      const [key] = firstEmptyField;
      setError({ [key]: true });

      const el = refs[key]?.current;
      if (el) {
        el.classList.add("animate__animated", "animate__shakeX");
        el.addEventListener(
          "animationend",
          () => {
            el.classList.remove("animate__animated", "animate__shakeX");
          },
          { once: true }
        );
      }
      return; // Stop execution here
    }

    // No errors, clear error state
    setError({});
    const stored = JSON.parse(localStorage.getItem("theatres")) || [];

    if (editIndex !== null) {
      stored[editIndex] = { ...stored[editIndex], ...formState };
    } else {
      const newTheatre = { id: Date.now().toString(36), ...formState };
      stored.push(newTheatre);
    }
    setTheatres(stored);
    localStorage.setItem("theatres", JSON.stringify(stored));
    setEditIndex(null);
    setIsEditMode(false);
    setFormState({
      theatreName: "",
      city: "",
      location: "",
      screens: "",
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => {
      if (prev[name]) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return prev;
    });
  };

  // src/pages/theater/Theatres.jsx

  // Your hooks and functions (useState, useEffect, etc.) remain the same.
  // Just replace the entire return block with this:

  return (
    <div style={{ backgroundColor: "transparent" }}>
      {/* Part 1: The Sticky Header and Button */}
      <div className="">
        <h1 className="page-title text-center mb-0">Theatres</h1>
        <hr className="title-separator" style={{ marginTop: "1rem" }} />
        <div className="d-flex justify-content-between align-items-center w-100 ">
          <div></div>
          <button
            type="button"
            className="btn btn-primary mx-4 mb-2"
            onClick={() => {
              resetForm();
              setIsEditMode(false); // Ensure we are in "Add" mode
              setShowModal(true);
              setError({});
            }}
          >
            Add Theatre
          </button>
        </div>
      </div>

      {/* Part 2: The Main Content Area with the Table */}
      {/* We use a simple container with horizontal padding (px-4) */}
      <div className="container-fluid px-4">
        {theatres.length > 0 ? (
          <table className="glass-table">
            <thead>
              <tr>
                <StickyTh>TheatreID</StickyTh>
                <StickyTh>Theatre</StickyTh>
                <StickyTh>Location</StickyTh>
                <StickyTh>City</StickyTh>
                <StickyTh>Screens</StickyTh>
                <StickyTh className=" text-center ">Alter</StickyTh>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {theatres.map((theatre, index) => (
                  <motion.tr
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                    className="text-left align-middle"
                    style={{ textAlign: "justify" }}
                    key={theatre.id}
                  >
                    <td className="px-3 py-2" style={{ width: "15%" }}>
                      {theatre.id}
                    </td>
                    <td className="px-3 py-2">{theatre.theatreName}</td>
                    <td className="px-3 py-2">{theatre.location}</td>
                    <td className="px-3 py-2">{theatre.city}</td>
                    <td className="px-3 py-2">{theatre.screens}</td>
                    <td className="d-flex justify-content-around">
                      <EditButton
                        className="card-action-btn" // Corrected class name
                        onClick={() => {
                          setIsEditMode(true);
                          setEditIndex(index);
                          setFormState(theatre);
                          setShowModal(true);
                          setError({});
                        }}
                      />
                      <DeleteButton
                        className="card-action-btn" // Corrected class name
                        data={theatres}
                        item={theatre}
                        setData={setTheatres}
                        storageKey="theatres"
                      />
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <p className="text-center mt-3">No theatres added yet.</p>
        )}
      </div>

      {/* Part 3: The Modal with the Corrected Form Structure */}
      <CustomModal show={showModal} onClose={() => setShowModal(false)}>
        {/* The <form> tag now wraps everything inside the modal */}
        <form onSubmit={handleAddTheatre}>
          <CustomModal.Header>
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {isEditMode ? "Edit Theatre" : "Add Theatre"}
            </h1>
            <button
              type="button"
              className="btn-close"
              id="close-modal"
              onClick={() => setShowModal(false)}
            ></button>
          </CustomModal.Header>
          <CustomModal.Body>
            <InputField
              ref={theatreNameRef}
              name="theatreName"
              label={"Theatre Name:"}
              value={formState.theatreName}
              onChange={handleChange}
            />
            <InputField
              ref={locationRef}
              label={"Location:"}
              name="location"
              value={formState.location}
              onChange={handleChange}
            />
            <InputField
              ref={cityRef}
              label={"City:"}
              name="city"
              value={formState.city}
              onChange={handleChange}
            />
            <InputField
              ref={screensRef}
              label={"Screens:"}
              name="screens"
              value={formState.screens}
              onChange={handleChange}
            />
          </CustomModal.Body>
          <CustomModal.Footer>
            <CloseModal onClick={() => setShowModal(false)} />
            <SaveModal color="btn-primary" />
          </CustomModal.Footer>
        </form>
      </CustomModal>
    </div>
  );
}
