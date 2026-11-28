import React, { useEffect } from "react";

const AirportMap = ({ airport, guess, onGuess }) => {
  useEffect(() => {
    if (!airport) return;

    const L = window.L;

    const map = L.map("map", {
      worldCopyJump: true,
      zoomControl: true,
    }).setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", (event) => {
      onGuess({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    });

    let airportMarker = null;
    let guessMarker = null;
    let line = null;

    if (guess) {
      const guessPosition = [guess.latitude, guess.longitude];
      const airportPosition = [airport.latitude_deg, airport.longitude_deg];

      airportMarker = L.circleMarker(airportPosition, {
        radius: 8,
        color: "#ffffff",
        weight: 3,
        fillColor: "#dba84e",
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(`<strong>${airport.name}</strong>`)
        .openPopup();

      guessMarker = L.circleMarker(guessPosition, {
        radius: 8,
        color: "#ffffff",
        weight: 3,
        fillColor: "#1d7a5a",
        fillOpacity: 1,
      }).addTo(map);

      line = L.polyline([guessPosition, airportPosition], {
        color: "#1d7a5a",
        weight: 2,
        opacity: 0.75,
        dashArray: "8 8",
      }).addTo(map);

      map.fitBounds([guessPosition, airportPosition], { padding: [48, 48], maxZoom: 5 });
    }

    window.requestAnimationFrame(() => map.invalidateSize());

    return () => {
      if (airportMarker) airportMarker.remove();
      if (guessMarker) guessMarker.remove();
      if (line) line.remove();
      map.remove();
    };
  }, [airport, guess, onGuess]);

  return <div id="map" className="map" role="application" aria-label="Airport guessing map" />;
};

export default AirportMap;