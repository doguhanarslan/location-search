import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap } from "leaflet";
import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import type { Place } from "../api/Place";

interface MapProps {
  place: Place | null;
}

export default function Map({ place }: MapProps) {
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current && place) {
      mapRef.current.flyTo([place.latitude, place.longitude]);
    }
  }, [place]);

  return (
    <MapContainer
          zoom={12}
      scrollWheelZoom
      className="h-full"
      center={[39.9,32.8]}
      ref={mapRef}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {place && <Marker position={[place.latitude, place.longitude]} />}
    </MapContainer>
  );
}
