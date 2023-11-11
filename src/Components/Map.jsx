import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../Contexts/CitiesContext";
import { useGeolocation } from "../Hooks/UseGeolocation";
import Button from "./Button";
import { UseUrlPosition } from "../Hooks/UseUrlPosition";

function Map() {
  const { cities } = useCities();

  // Useparamhook ko customhook ban ke use kiya
  const [mapLat, mapLng] = UseUrlPosition();

  const [mapPosition, setMapPosition] = useState([40, 0]);

  // location funtion useGeolocation()
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // JAB HAM KISE CITY PE CLICK KRTE HAI TO AUTOMATACALLY MAP CITY CHANGE HO RHE THE USKO ROKNE AND STATE KO REMBER RAKHNE KE LIYE
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    // by default geolocationPosition is null but when me click on get my location then compenent render and then the value will be come and and geolocationPosition will update and it will set setMapPosition
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    // run each time geolocationPosition changes for dependency aarry
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetactClick />
      </MapContainer>
    </div>
  );
}

// when map position changes and then map will go there
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetactClick() {
  const navigate = useNavigate();

  // url me position save kr le
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
