import React, { useEffect, useState } from "react";
import AirportMap from "./AirportMap";
import { getDistanceInKm } from "./distance";
import "./App.css";

const App = () => {
  const [airport, setAirport] = useState(null);
  const [guess, setGuess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadRandomAirport() {
    setIsLoading(true);
    setGuess(null);

    try {
      const response = await fetch(
        "https://airports.mimo.dev/api/random-airport",
      );
      if (!response.ok) throw new Error("Could not load airport");
      const data = await response.json();
      setAirport(data);
    } catch (error) {
      console.error(error);
      setAirport(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRandomAirport();
  }, []);

  const distance = guess && airport ? getDistanceInKm(guess, airport) : null;

  return (
    <main className="app-shell">
      <section className="game-card" aria-live="polite">
        <header className="game-header">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              ✈
            </span>
            <span>Around the World</span>
          </div>

          {distance !== null && (
            <span className="status-pill status-complete">
              Location revealed
            </span>
          )}
          {airport && distance === null && (
            <span className="status-pill status-playing">
              <span className="status-dot" /> Make your guess
            </span>
          )}
        </header>

        <div className="game-content">
          <div className="prompt-panel">
            {isLoading ? (
              <>
                <p className="eyebrow">Preparing destination</p>
                <div className="title-skeleton skeleton" />
              </>
            ) : airport ? (
              <>
                <p className="eyebrow">Find this airport</p>
                <h1 className="prompt">
                  Where is <span>{airport.name}</span>?
                </h1>
              </>
            ) : (
              <>
                <p className="eyebrow">Something went wrong</p>
                <h1 className="prompt">Couldn’t load an airport</h1>
              </>
            )}

            {distance !== null ? (
              <div className="result-card">
                <span className="result-label">Your distance</span>
                <strong className="result-distance">
                  {distance.toLocaleString()} <small>km</small>
                </strong>
                <span className="result-caption">from the correct location</span>
              </div>
            ) : airport ? (
              <p className="instruction">
                Tap anywhere on the map to place your guess.
              </p>
            ) : null}
          </div>

          <div className="map-panel">
            <AirportMap airport={airport} guess={guess} onGuess={setGuess} />
          </div>
        </div>

        <footer className="game-footer">
          <p className="hint">Explore the map, then choose your best location.</p>
          <button className="next-button" onClick={loadRandomAirport} disabled={isLoading}>
            <span>{isLoading ? "Loading" : distance !== null ? "Next airport" : "Skip airport"}</span>
            <span className="button-arrow" aria-hidden="true">→</span>
          </button>
        </footer>
      </section>
    </main>
  );
};

export default App;
