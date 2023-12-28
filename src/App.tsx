import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef: any = useRef(null);

  const [ featureLayerGeoJson, setFeatureLayerGeoJson ] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      //const map = L.map('map').setView([19.026319, -70.147792], 8);

      const map = L.map(`map`, {
        editable: true,
        center: [19.026319, -70.147792],
        zoom: 9,
        zoomControl: false,
      });

      map.pm.setLang("es");
      const drawFeatures = new L.FeatureGroup();

      map.pm.addControls({
        position: "topright",
        drawCircle: true,
        drawCircleMarker: true,
        drawText: false,
        drawMarker: true,
        cutPolygon: true,
      });

      map.pm.setGlobalOptions({ layerGroup: drawFeatures });

      map.addLayer(drawFeatures);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.control
        .zoom({
          position: "topright",
          zoomInTitle: "Acercar",
          zoomOutTitle: "Alejar",
        })
        .addTo(map);

      mapRef.current = map;
      setFeatureLayerGeoJson(drawFeatures)
    }
  }, []);

  const exportLayerToGeoJson = () => {
    console.log("GeoJson de DrawFeatures", featureLayerGeoJson.toGeoJSON())
  }

  return (
    <>
    <button onClick={exportLayerToGeoJson}>Ver GeoJSON</button>
      <div className="App">
        <div id="map" style={{ height: "100vh" }}></div>
      </div>
    </>
  );
};

export default App;
