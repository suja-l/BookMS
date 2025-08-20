import React, { useEffect, useState, useMemo } from "react";
import CustomModal from "../../Components/Modal";
import { InputField, Button } from "../../Components/Button";
import CardList from "../../Components/cardList";
import { Cards } from "../../Components/cards";

const timeStringToMinutes = (timeStr) => {
  if (!timeStr || typeof timeStr !== "string") return null;
  const [time, meridian] = timeStr.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (meridian.toLowerCase() === "pm" && hours !== 12) hours += 12;
  if (meridian.toLowerCase() === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};
const formReset = {
  movie: "",
  theatre: "",
  screen: [], // Array of { screenNo, language, type, slots: [] }
  release_Date: "",
};

const generateTimeSlots = (startTime, endTime, interval) => {
  const slots = [];
  let currentTime = new Date();
  currentTime.setHours(startTime, 0, 0, 0);
  const end = new Date();
  end.setHours(endTime, 0, 0, 0);
  while (currentTime <= end) {
    slots.push(
      currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
    currentTime.setMinutes(currentTime.getMinutes() + interval);
  }
  return slots;
};

export default function Showtime() {
  document.title = "Showtimes";

  const handleOpenModal = () => {
    setFormState(formReset);
    setShowModal(true);
  };
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  // eslint-disable-next-line
  const [showtimes, setShowtimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formstate, setFormState] = useState(formReset);
  const selectedTheatre = useMemo(
    () => theatres.find((t) => t.id === formstate.theatre),
    [formstate.theatre, theatres]
  );
  const selectedMovie = useMemo(
    () => movies.find((m) => m.id === formstate.movie),
    [formstate.movie, movies]
  );
  const allPossibleSlots = useMemo(() => generateTimeSlots(9, 23, 30), []);

  const enrichedShowtimes = useMemo(() => {
    if (!showtimes || !movies || !theatres) {
      return [];
    }
    return showtimes.map((showtime) => {
      const movieDetails = movies.find((movie) => movie.id === showtime.movie);
      const theatreDetails = theatres.find((t) => t.id === showtime.theatre);
      return {
        ...showtime,
        movie: movieDetails,
        theatre: theatreDetails,
      };
    });
  }, [showtimes, movies, theatres]);

  // --- Validation Logic ---
  const isSlotAvailable = (newSlot, existingSlots, movieDuration) => {
    if (!movieDuration) return false; // Can't check if we don't know the duration
    const newSlotStart = timeStringToMinutes(newSlot);
    const newSlotEnd = newSlotStart + parseInt(movieDuration, 10);
    if (newSlotStart === null) return false;
    for (const existingSlot of existingSlots) {
      const existingSlotStart = timeStringToMinutes(existingSlot);
      const existingSlotEnd = existingSlotStart + parseInt(movieDuration, 10);
      if (newSlotStart < existingSlotEnd && newSlotEnd > existingSlotStart) {
        return false; // Overlap found
      }
    }
    return true; // No overlaps
  };

  // --- Event Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "theatre") {
      // If it is, we do a special update
      setFormState((prev) => ({
        ...prev, // Keep the other parts of the state (like the selected movie)
        theatre: value, // Update the theatre ID
        screen: [], // <-- The important part: Reset the screen data
        release_Date: "",
      }));
    } else {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleScreenDetailChange = (screenNum, field, value) => {
    setFormState((prev) => {
      const newScreens = [...prev.screen];
      const screenIndex = newScreens.findIndex((s) => s.screenNo === screenNum);

      if (screenIndex > -1) {
        newScreens[screenIndex] = {
          ...newScreens[screenIndex],
          [field]: value,
        };
      } else {
        newScreens.push({ screenNo: screenNum, [field]: value, slots: [] });
      }
      return { ...prev, screen: newScreens };
    });
  };

  const handleAddSlot = (screenNum, slotToAdd) => {
    if (!slotToAdd) {
      alert("Please select a time slot.");
      return;
    }
    setFormState((prev) => {
      const newScreens = [...prev.screen];
      const screenIndex = newScreens.findIndex((s) => s.screenNo === screenNum);

      if (screenIndex > -1) {
        const updatedSlots = [...newScreens[screenIndex].slots, slotToAdd].sort(
          (a, b) => timeStringToMinutes(a) - timeStringToMinutes(b)
        );
        newScreens[screenIndex] = {
          ...newScreens[screenIndex],
          slots: updatedSlots,
        };
        return { ...prev, screen: newScreens };
      }
      // Note: In a real app, you'd handle the case where the screen object doesn't exist yet.
      return prev;
    });
  };

  const handleRemoveSlot = (screenNum, slotToRemove) => {
    setFormState((prev) => {
      const newScreens = [...prev.screen];
      const screenIndex = newScreens.findIndex((s) => s.screenNo === screenNum);
      if (screenIndex > -1) {
        newScreens[screenIndex] = {
          ...newScreens[screenIndex],
          slots: newScreens[screenIndex].slots.filter(
            (s) => s !== slotToRemove
          ),
        };
      }
      return { ...prev, screen: newScreens };
    });
  };
  const handleSaveShowtime = () => {
    const allShowtimes = JSON.parse(localStorage.getItem("showtimes")) || [];

    const existingShowtimeIndex = allShowtimes.findIndex(
      (showtime) =>
        showtime.movie === formstate.movie &&
        showtime.theatre === formstate.theatre
    );
    if (existingShowtimeIndex > -1) {
      const existingShowtime = allShowtimes[existingShowtimeIndex];
      const updatedShowtime = {
        ...existingShowtime,
        screen: formstate.screen,
      };
      allShowtimes[existingShowtimeIndex] = updatedShowtime;
      alert("Showtime upadted successfully!");
    } else {
      const newShowtime = {
        id: `st_${Date.now().toString(36)}`,
        movie: formstate.movie,
        theatre: formstate.theatre,
        screen: formstate.screen,
        release_Date: formstate.release_Date,
      };
      allShowtimes.push(newShowtime);
      alert("Showtime saved succesfully!");
    }
    localStorage.setItem("showtimes", JSON.stringify(allShowtimes));
    setShowtimes(allShowtimes);
    setFormState(formReset);
    setShowModal(false);
  };

  // --- Data Fetching and Memoization ---
  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies")) || []);
    setTheatres(JSON.parse(localStorage.getItem("theatres")) || []);
    setShowtimes(JSON.parse(localStorage.getItem("showtimes")) || []);
  }, []);
  return (
    <>
      <div className="container d-flex justify-content-end">
        <Button color="bg-info-subtle" onClick={handleOpenModal}>
          Add Showtime
        </Button>
      </div>
      <div className="container">
        {/* // Inside src/pages/Showtime/showtime.jsx */}
        <div className="container">
          <CardList
            items={enrichedShowtimes}
            onAddClick={() => {
              setShowModal(formReset);
              setShowModal(true);
            }}
          >
            {(showtime, index) => (
              <Cards
                key={showtime.id}
                title={showtime.movie?.movie}
                subtitle={showtime.theatre?.theatreName}
                imageUrl={showtime.movie?.posterURL}
                // You can add Edit/Delete buttons here if needed
              >
                {/* This content gets passed as 'children' to the card's body */}
                <div className="d-flex flex-column gap-2 text-light small">
                  <div>
                    <strong className="card-metadata-label d-block">
                      Release Date
                    </strong>
                    {new Date(showtime.release_Date).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <hr
                    className="my-1"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  />
                  {showtime.screen.map((s) => (
                    <div key={s.screenNo}>
                      <strong className="card-metadata-label d-block">
                        Screen {s.screenNo} ({s.language}/{s.type})
                      </strong>
                      <div className="d-flex flex-wrap gap-1">
                        {s.slots.map((slot) => (
                          <span key={slot} className="badge bg-secondary">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Cards>
            )}
          </CardList>
        </div>
      </div>
      <CustomModal show={showModal} onClose={() => setShowModal(false)}>
        <CustomModal.Header>
          <h5>Create Showtime</h5>
        </CustomModal.Header>
        <CustomModal.Body>
          {/* Movie and Theatre Selection */}
          <InputField
            as="select"
            name="movie"
            label="Select Movie:"
            value={formstate.movie}
            onChange={handleChange}
          >
            <option value="">-- Select a Movie --</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>
                {m.movie}
              </option>
            ))}
          </InputField>
          <InputField
            as="select"
            name="theatre"
            label="Select Theatre:"
            value={formstate.theatre}
            onChange={handleChange}
          >
            <option value="">-- Select a Theatre --</option>
            {theatres.map((t) => (
              <option key={t.id} value={t.id}>
                {t.theatreName}
              </option>
            ))}
          </InputField>
          <InputField
            inputType="date"
            name="release_Date"
            label="Release Date:"
            value={formstate.release_Date}
            onChange={handleChange}
          />

          {/* Screens Configuration */}
          {selectedTheatre && selectedMovie && (
            <div className="d-flex flex-column gap-3 mt-3">
              {Array.from(
                { length: selectedTheatre.screens },
                (_, i) => i + 1
              ).map((screenNum) => {
                const screenData = formstate.screen.find(
                  (s) => s.screenNo === screenNum
                ) || { slots: [] };
                const availableSlots = allPossibleSlots.filter((slot) =>
                  isSlotAvailable(
                    slot,
                    screenData.slots,
                    selectedMovie.duration
                  )
                );

                return (
                  <div
                    key={screenNum}
                    className="p-3 rounded"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <h6>Screen {screenNum}</h6>
                    <div className="d-flex gap-2">
                      {/* Language & Type Dropdowns */}
                      <InputField
                        as="select"
                        name="language"
                        value={screenData.language || ""}
                        onChange={(e) =>
                          handleScreenDetailChange(
                            screenNum,
                            "language",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Language</option>
                        {selectedMovie.languages.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </InputField>
                      <InputField
                        as="select"
                        name="type"
                        value={screenData.type || ""}
                        onChange={(e) =>
                          handleScreenDetailChange(
                            screenNum,
                            "type",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Type</option>
                        {selectedMovie.types.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </InputField>
                    </div>

                    {/* Display and Add Slots */}
                    <div className="mt-2">
                      <strong>Slots:</strong>
                      <div className="d-flex flex-wrap gap-2 mt-1">
                        {screenData.slots.map((slot) => (
                          <span
                            key={slot}
                            className="badge bg-info d-flex align-items-center gap-2"
                          >
                            {slot}
                            <button
                              type="button"
                              className="btn-close btn-close-white"
                              style={{ fontSize: "0.5rem" }}
                              onClick={() => handleRemoveSlot(screenNum, slot)}
                            ></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-2">
                      <InputField as="select" name={`slot-for-${screenNum}`}>
                        <option value="">-- Select an available slot --</option>
                        {availableSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </InputField>
                      <Button
                        color="btn-primary"
                        onClick={() => {
                          const selectEl = document.querySelector(
                            `select[name="slot-for-${screenNum}"]`
                          );
                          handleAddSlot(screenNum, selectEl.value);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CustomModal.Body>
        <CustomModal.Footer>
          <Button color="btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button color="btn-success" onClick={() => handleSaveShowtime()}>
            Save Showtime
          </Button>
        </CustomModal.Footer>
      </CustomModal>
    </>
  );
}
