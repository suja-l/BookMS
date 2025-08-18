// import React, { useEffect, useState } from "react";
// import {
//   CloseModal,
//   DeleteButton,
//   EditButton,
//   InputField,
//   SaveModal,
//   StickyTh,
// } from "../auth/Button";
// import { Cards } from "./cards";

// export default function Movies() {
//   //   const [Movies, setMovies] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [genre, setGenre] = useState("");
//   const [Movie, setMovie] = useState("");
//   const [Language, setLanguage] = useState([]);
//   const [description, setDescription] = useState([]);
//   const [posterURL, setPosterURL] = useState([]);
//   const [Duration, setDuration] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [movieType, setMovieType] = useState([]);
//   const availableLanguages = ["English", "Hindi", "Kannada", "Telugu", "Tamil"];
//   const availableTypes = ["2D", "3D", "4DX"];

//   const [formState, setFormState] = useState({
//     Movie: "",
//     genre: "",
//     description: "",
//     posterURL: "",
//     duration: "",
//     Languages: [],
//     types: [],
//   });

//   function onChange(e) {
//     const { name, value } = e.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   }

//   const [EditedMovie, setEditedMovie] = useState({
//     MovieName: "",
//     genre: "",
//     description: "",
//     posterURL: "",
//     Duration: "",
//     Languages: [],
//     types: [],
//   }); // eslint-disable-next-line

//   useEffect(() => {
//     const storedMovies = JSON.parse(localStorage.getItem("Movies")) || [];
//     setMovies(storedMovies);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => setShow(true), 100);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleAddMovie = () => {
//     if (
//       !Movie ||
//       !genre ||
//       !Language ||
//       !movieType ||
//       !description ||
//       !posterURL ||
//       !Duration
//     )
//       return alert("Please fill all the fields");

//     const stored = JSON.parse(localStorage.getItem("Movies")) || [];
//     const newMovie = {
//       id: Date.now().toString(36),
//       Movie,
//       genre,
//       Language,
//       movieType,
//       description,
//       posterURL,
//       Duration,
//     };
//     const updated = [...stored, newMovie];

//     setMovies(updated);
//     localStorage.setItem("Movies", JSON.stringify(updated));
//     setMovie("");
//     setGenre("");
//     setLanguage([]);
//     setMovieType([]);
//     setDescription("");
//     setPosterURL("");
//     setDuration("");
//   };
//   const handleLanguageChange = (e) => {
//     const selected = e.target.value;

//     setLanguage(
//       (prev) =>
//         prev.includes(selected)
//           ? prev.filter((lang) => lang !== selected) // remove
//           : [...prev, selected] // add
//     );
//   };
//   const handleTypeChange = (e) => {
//     const selected = e.target.value;

//     setMovieType(
//       (prev) =>
//         prev.includes(selected)
//           ? prev.filter((type) => type !== selected) // remove
//           : [...prev, selected] // add
//     );
//   };

//   const tableStyle = {
//     display: "grid",
//     // gridTemplateColumns: "5fr",
//     width: "75%",
//     opacity: show ? 1 : 0,
//     transform: show ? "translateY(0)" : "translateY(30px)",
//     transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
//   };

//   return (
//     <>
//       <div
//         className="modal fade"
//         id="exampleModal2"
//         tabIndex="-1"
//         aria-labelledby="exampleModal2Label"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog ">
//           <div
//             className="modal-content bg-dark-subtle"
//             style={{
//               backgroundColor: "#fff",
//               padding: "20px",
//               border: "2px solid #000",
//               zIndex: 9999,
//             }}
//           >
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModal2Label">
//                 {isEditMode ? "Edit Movie" : "Add Movie"}
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <label className="form-label">
//                 <h5>Movie Name:</h5>
//               </label>
//               <InputField
//                 inputType="text"
//                 inputPlaceholder="Enter Movie Name"
//                 name="Movie"
//                 value={formState.Movie}
//                 onChange={(e) => onChange()}
//               />
//               <label className="form-label">
//                 <h5>Movie Description:</h5>
//               </label>
//               <InputField
//                 inputType="textarea"
//                 inputPlaceholder="Type Movie Description here..."
//                 value={description}
//                 onChange={setDescription}
//               />
//               <InputField
//                 inputType="url"
//                 inputPlaceholder="https://example.com/poster.jpg"
//                 value={posterURL}
//                 onChange={setPosterURL}
//               />
//               {posterURL && (
//                 <div className="mb-3">
//                   <img
//                     src={posterURL}
//                     alt="Poster Preview"
//                     style={{ maxWidth: "200px" }}
//                   />
//                 </div>
//               )}
//               <label className="form-label">
//                 <h5>Genre:</h5>
//               </label>
//               <InputField
//                 inputType="text"
//                 inputPlaceholder="Enter genre separated by '/ '"
//                 value={genre}
//                 onChange={setGenre}
//               />
//               <InputField
//                 inputType="number"
//                 inputPlaceholder="Enter Duration (e.g., 120 mins)"
//                 value={Duration}
//                 onChange={setDuration}
//               />
//               <div className="row">
//                 <label className="form-label">
//                   <h5>Languages:</h5>
//                 </label>
//                 <br />{" "}
//                 {availableLanguages.map((lang) => (
//                   <div className="col-6 col-sm-4 col-md-4 mb-2" key={lang}>
//                     <label className="form-check-label d-flex align-items-center gap-1"></label>
//                     <div key={lang}>
//                       <label>
//                         <input
//                           type="checkbox"
//                           value={lang}
//                           checked={Language.includes(lang)}
//                           onChange={handleLanguageChange}
//                         />
//                         {lang}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <br />
//               <div className="row">
//                 <label className="form-label">
//                   <h5>Movie Type:</h5>
//                 </label>
//                 {availableTypes.map((type) => (
//                   <div className="col-6 col-sm-4 col-md-4 mb-2" key={type}>
//                     <label className="form-check-label d-flex align-items-center gap-1"></label>
//                     <div key={type}>
//                       <label>
//                         <input
//                           type="checkbox"
//                           value={type}
//                           checked={movieType.includes(type)}
//                           onChange={handleTypeChange}
//                         />
//                         {type}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="modal-footer">
//               <CloseModal color="btn-secondary" />
//               <SaveModal color="btn-primary" onSaveClick={handleAddMovie} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* -----------------------------------------------------TABLE-------------------------------------------------------------------------------------------------*/}
//       {/* Main container */}
//       <div className="container-fluid mt-5" style={tableStyle}>
//         <div className="caption-top d-flex mb-0 ">
//           <h2>Movies</h2>

//           {/* <div
//               className="d-flex align-items-end"
//               style={{ position: "sticky", top: "66px", zIndex: 20 }}
//             > */}
//           <button
//             type="button"
//             className="btn btn-primary ms-auto mb-2"
//             data-bs-toggle="modal"
//             data-bs-target="#exampleModal2"
//             onClick={() => {
//               setIsEditMode(false);
//               setMovie("");
//               setGenre("");
//               setLanguage([]);
//               setMovieType([]);
//               setDescription("");
//               setPosterURL("");
//               setDuration("");
//             }}
//           >
//             Add Movie
//           </button>
//           {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
//         </div>
//         <hr
//           className="ms-0 opacity-100 border-dark"
//           style={{ width: "280px" }}
//         />

//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {Movies.map((movie, i) => (
//             <div className="col" key={movie.id}>
//               <Cards
//                 key={movie.id}
//                 name={movie.Movie}
//                 description={movie.description}
//                 PosterURL={movie.posterURL}
//                 genre={movie.genre}
//                 Duration={movie.Duration}
//                 Languages={movie.Language}
//                 types={movie.movieType}
//                 id={movie.id}
//                 // movie={movie}
//                 Editbtn={
//                   <EditButton
//                     data-bs-toggle="modal"
//                     data-bs-target="#exampleModal2"
//                     onEditClick={() => {
//                       setIsEditMode(true);

//                       setFormState(movie);
//                     }}
//                   />
//                 }
//                 Delbtn={
//                   <DeleteButton
//                     onDelClick={() => {
//                       const updated = Movies.filter((t) => t.id !== movie.id);
//                       setMovies(updated);
//                       localStorage.setItem("Movies", JSON.stringify(updated));
//                     }}
//                   />
//                 }
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
