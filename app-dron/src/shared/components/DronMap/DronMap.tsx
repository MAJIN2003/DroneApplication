// components/DroneMap.tsx
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Polyline,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { UAVResponse } from "@/app/dashboard/gestor-reportes/interfaces/findReports/uav.interface";

interface DroneMapProps {
  uavResponses: UAVResponse;
  loadingData: boolean;
}

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const options = {
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 2,
};

const startIcon = {
  url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
};

const endIcon = {
  url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
};

const labelStyle = {
  color: "#000",
  fontSize: "20px",
  fontWeight: "bold",
};

const DroneMap: React.FC<DroneMapProps> = ({ uavResponses, loadingData }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAqmSVPuFOoBQVChoWoEoA6N3kddus-3Ls",
  });

  const [pathCoordinates, setPathCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    if (uavResponses?.data) {
      const coordinates = uavResponses.data.map((response) => ({
        lat: response.latitud,
        lng: response.longitud,
      }));
      setPathCoordinates(coordinates);
    }
  }, [uavResponses]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!pathCoordinates || pathCoordinates.length === 0) {
    return null;
  }

  if (loadingData) {
    return <div>Loading...</div>;
  }
  const startPosition = pathCoordinates[0];
  const endPosition = pathCoordinates[pathCoordinates.length - 1];

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={startPosition}
    >
      <Polyline path={pathCoordinates} options={options} />
      <Marker
        position={startPosition}
        icon={startIcon}
        label={{
          text: "Inicio",
          color: labelStyle.color,
          fontSize: labelStyle.fontSize,
          fontWeight: labelStyle.fontWeight,
        }}
      />
      <Marker
        position={endPosition}
        icon={endIcon}
        label={{
          text: "Fin",
          color: labelStyle.color,
          fontSize: labelStyle.fontSize,
          fontWeight: labelStyle.fontWeight,
        }}
      />
    </GoogleMap>
  );
};

export default DroneMap;
