import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";
import { Typography } from "@mui/material";
import GoogleMapReact from "google-map-react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@mui/material/Rating";
import mapStyles from "./mapStyles";

export const Map = ({
  coords,
  places,
  setCoords,
  setBounds,
  setChildClicked,
  weatherData,
}) => {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places.length &&
          places.map((place, i) => (
            <div
              style={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 } }}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!matches ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100px",
                  }}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img
                    style={{ cursor: "pointer" }}
                    src={
                      place.photo ? place.photo.images.large.url : "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/34/2021/04/Paul-Craig-The-Petersham-9-Copy-920x609.jpg"
                    }
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(place.rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}

        {weatherData?.current?.length &&
          <div>
            <img src={`${weatherData.current.condition.icon}`} height="70px" alt="some image" />
          </div>
        }
      </GoogleMapReact>
    </div>
  );
};