import { useState } from "react";
import HeaderComponent from "../components/header";
import { GiHotMeal } from "react-icons/gi";
import { PiHouseLight } from "react-icons/pi";
import { Button, TextField, Slider, Checkbox, FormControlLabel, FormGroup, Typography, Box, MenuItem } from "@mui/material";
import { addNewPG } from '../../utils/pgAPICalls';
import { uploadFileInStorage } from '../../utils/firebaseFunctions';
import { useNavigate } from "react-router-dom";
import notAvailableImage from "../assets/noAvailable.jpg";

function NewPGEntryScreen() {
  const imageToUse = notAvailableImage;
  const navigate = useNavigate();
  const [pgName, setPGName] = useState("");
  const [pgLocation, setPGLocation] = useState("");
  const [roomCondition, setRoomCondition] = useState(0);
  const [bathroomCondition, setBathroomCondition] = useState(0);
  const [locationConvenience, setLocationConvenience] = useState(0);
  const [overallRating, setOverallRating] = useState(0);
  const [price, setPrice] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [possibleLocations, setPossibleLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const api_key = import.meta.env.VITE_OLA_MAPS_API_KEY;

  const apiHitting = async (searchText) => {
    try {
      const urlSearchText = encodeURIComponent(searchText.trim());
      const apiURL = `https://api.olamaps.io/places/v1/autocomplete?input=${urlSearchText}&api_key=${api_key}`;
      const hittingAPI = await fetch(apiURL);
      const gettingData = await hittingAPI.json();
      setPossibleLocations(gettingData.predictions || []);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setPGLocation(value);
    if (value.length > 2) {
      await apiHitting(value);
    } else {
      setShowDropdown(false);
    }
  };

  const handleLocationSelect = (location) => {
    setPGLocation(location);
    setShowDropdown(false);
  };

  const addNewPGFunction = async () => {
    if (!pgName || !pgLocation) {
      alert("Please fill Name and Location of your PG");
      return;
    }

    try {
      const imageToUpload = imageFile || imageToUse;
      const imageURL = await uploadFileInStorage(imageToUpload, pgName);
      await addNewPG(
        pgName,
        pgLocation,
        roomCondition,
        bathroomCondition,
        locationConvenience,
        overallRating,
        price,
        facilities,
        imageURL
      );
      alert("PG Added to Database");
      navigate("/search");
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleFacilityChange = (event) => {
    const value = event.target.value;
    setFacilities((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((facility) => facility !== value)
    );
  };

  return (
    <>
      <HeaderComponent newEntryPage={true} />
      <Box sx={{ maxWidth: "600px", margin: "auto", p: 3 }}>
        <TextField
          label="PG Name"
          variant="outlined"
          fullWidth
          value={pgName}
          onChange={(e) => setPGName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="PG Location"
          variant="outlined"
          fullWidth
          value={pgLocation}
          onChange={handleLocationChange}
          sx={{ mb: 2 }}
        />
        {showDropdown && (
          <Box sx={{ maxHeight: 200, overflowY: "auto", border: 1, borderRadius: 1, p: 1 }}>
            {possibleLocations.map((location, index) => (
              <MenuItem key={index} onClick={() => handleLocationSelect(location.description)}>
                {location.description}
              </MenuItem>
            ))}
          </Box>
        )}

        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Room Condition
        </Typography>
        <Slider
          value={roomCondition}
          onChange={(e, value) => setRoomCondition(value)}
          step={1}
          marks
          min={0}
          max={5}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">Bathroom Condition</Typography>
        <Slider
          value={bathroomCondition}
          onChange={(e, value) => setBathroomCondition(value)}
          step={1}
          marks
          min={0}
          max={5}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">Location Convenience</Typography>
        <Slider
          value={locationConvenience}
          onChange={(e, value) => setLocationConvenience(value)}
          step={1}
          marks
          min={0}
          max={5}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">Overall Rating</Typography>
        <Slider
          value={overallRating}
          onChange={(e, value) => setOverallRating(value)}
          step={1}
          marks
          min={0}
          max={5}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Rent"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1">Facilities</Typography>
        <FormGroup row sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={facilities.includes("meals")}
                onChange={handleFacilityChange}
                value="meals"
              />
            }
            label={
              <>
                <GiHotMeal size={20} />
                Meals
              </>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={facilities.includes("houseKeeping")}
                onChange={handleFacilityChange}
                value="houseKeeping"
              />
            }
            label={
              <div className="flex flex-row items-center border border-black rounded-md p-1">
                <p className="mr-2">House Keeping</p>
                <PiHouseLight size={20} />
              </div>
            }
          />
        </FormGroup>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography sx={{ mr: 2 }}>Upload Image :</Typography>
          <Button variant="contained" component="label">
            Choose File
            <input type="file" hidden onChange={handleImageFileChange} />
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={addNewPGFunction}>
          Submit
        </Button>
      </Box>
    </>
  );
}

export default NewPGEntryScreen;
