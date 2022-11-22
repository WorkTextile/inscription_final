// 👇️ ts-nocheck disables type checking for entire file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import React, {useEffect, useRef, useState} from 'react'
import { Search, GpsFixed } from "@mui/icons-material"
import { useFormData } from '../../context/UserContext';


const apiKey = import.meta.env.VITE_APP_GMAP_API_KEY;
const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';


// load google map api js

function loadAsyncScript(src: any) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    })
    script.addEventListener("load", () => resolve(script));
    document.head.appendChild(script);
  })
}

type Address = {
  city: string;
  state: string;
  zip: string;
  country: string;
}

const extractAddress = (place) => {

  const address = {
    city: "",
    state: "",
    zip: "",
    country: "",
    plain() {
      const city = this.city ? this.city + ", " : "";
      const zip = this.zip ? this.zip + ", " : "";
      const state = this.state ? this.state + ", " : "";
      return city + zip + state + this.country;
    }
  }

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    if (types.includes("locality")) {
      address.city = value;
    }

    if (types.includes("administrative_area_level_2")) {
      address.state = value;
    }

    if (types.includes("postal_code")) {
      address.zip = value;
    }

    if (types.includes("country")) {
      address.country = value;
    }

  });

  return address;
}


function GoogleAutoComplete() {

  const searchInput = useRef(null);
  const [address, setAddress] = useState({});
  const { userData, setFormValues} = useFormData();


  // init gmap script
  const initMapScript = () => {
    // if script already loaded
    if(window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  }

  // do something on address change
  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setFormValues(extractAddress(place));
  }

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));

  }

  const reverseGeocode = ({ latitude: LatValue, longitude: LongValue}) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${LatValue},${LongValue}`;
    searchInput.current.value = "Getting your location...";
    fetch(url)
        .then(response => response.json())
        .then(location => {
          const place = location.results[0];
          const _address = extractAddress(place);
          setAddress(_address);
          searchInput.current.value = _address.plain();
        })
  }

/** 
  const findMyLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        reverseGeocode(position.coords)
      })
    }
  }

*/
  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  }, []);


  return (
    <div className="App">
      <div>
        <div className="search">
          <span><Search /></span>
          <input ref={searchInput} type="text" placeholder="Search location...." />
         {/* <button onClick={findMyLocation}><GpsFixed />Click to check your current position</button> */}
        </div>

        <div className="address">
          {/*
          <p>City: <span>{userData.city}</span></p>
          <p>State: <span>{userData.state}</span></p>
          <p>Zip: <span>{userData.zip}</span></p>
          <p>Country: <span>{userData.country}</span></p>
          */}
        </div>

      </div>
    </div>
  )
}

export default GoogleAutoComplete

