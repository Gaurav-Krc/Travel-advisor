import React, { useState, useEffect, createRef } from 'react';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Typography} from '@mui/material';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

export const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div style ={{padding: '25px'}}>
      <Typography gutterBottom variant="h5" style={{color: "maroon"}}>Food & Dining around you 😋</Typography>
      {isLoading ? (
        <div style = {{height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress size="5rem" />
        </div>
        ) : (
          <>
              <FormControl gutterBottom sx={{ m:1 ,mb: 5, minWidth: 120 }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
              id="type"
              value={type}
              label="Type"
              onChange={handleTypeChange}
              >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
              </Select>
              
              </FormControl>
              <FormControl gutterBottom sx={{m:1, mb: 5, minWidth: 120 }}>
              <InputLabel id="rating">Rating</InputLabel>
              <Select
              label="Rating"
              value={rating}
              onChange={handleRatingChange}
              >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
              </Select>
              </FormControl>
              <Grid container spacing={4} style = {{height: '75vh', overflow: 'auto'}}>
                  {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                    </Grid>
                  ))}
              </Grid>
          </>
        )}
    </div>
  );
}

