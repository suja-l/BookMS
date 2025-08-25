import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Cards } from "../../Components/cards";
import CardList from "../../Components/cardList";

export default function Dashboard() {
  document.title = "Dashboard - BookMyShow";

  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem("movies")) || []);
    setTheatres(JSON.parse(localStorage.getItem("theatres")) || []);
    setShowtimes(JSON.parse(localStorage.getItem("showtimes")) || []);
  }, []);

  const moviesWithShowtimes = useMemo(() => {
    const enrichedShowtimes = showtimes
      .map((st) => ({
        ...st,
        movieDetails: movies.find((m) => m.id === st.movie),
        theatreDetails: theatres.find((t) => t.id === st.theatre),
      }))
      .filter((st) => st.movieDetails && st.theatreDetails);

    // Now, group these enriched showtimes by movie ID
    const groupedByMovie = enrichedShowtimes.reduce((acc, st) => {
      const movieId = st.movieDetails.id;
      // If we haven't seen this movie yet, create an entry for it
      if (!acc[movieId]) {
        acc[movieId] = {
          ...st.movieDetails, // Copy all movie details (title, poster, etc.)
          showtimeInfo: [], // Create a new list for its showtimes
        };
      }
      // Add the current showtime info to this movie's list
      acc[movieId].showtimeInfo.push({
        theatreName: st.theatreDetails.theatreName,
        releaseDate: st.release_Date,
        screens: st.screen,
      });
      return acc;
    }, {});

    // The result of reduce is an object, so we convert it back to an array
    return Object.values(groupedByMovie);
  }, [movies, theatres, showtimes]);

  return (
    <div className="container mt-4">
      <div className="sticky-page-header">
        <h1 className="page-title">Now Showing</h1>
        <hr className="title-separator" />
      </div>

      <CardList items={moviesWithShowtimes}>
        {(movie) => (
          <Cards key={movie.id} imageUrl={movie.posterURL}>
            {/* Card Header: Movie Title and Genre */}
            <div className="text-center">
              <h5 className="card-title text-uppercase text-info fw-bold mb-1">
                {movie.movie}
              </h5>
              <p className="small" style={{ color: "#ccc" }}>
                {movie.genre}
              </p>
            </div>
            <hr
              className="my-2"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            />

            {/* Card Body: List of available theatres */}
            <strong className="card-metadata-label d-block mb-2">
              Available in:
            </strong>
            <div className="flex-grow-1 mb-3 ">
              <div
                className="d-flex flex-column gap-1"
                style={{ maxHeight: "100px", overflowY: "auto" }}
              >
                {movie.showtimeInfo.map((info, index) => (
                  <span key={index} className="badge bg-secondary">
                    {info.theatreName}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer: The booking option / Call to action */}
            <Link
              to={`/showtime/${movie.id}`}
              className="btn btn-primary mt-auto"
            >
              View Showtimes
            </Link>
          </Cards>
        )}
      </CardList>
    </div>
  );
}
