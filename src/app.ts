import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const googleApi = "AIzaSyBtp_putpyNoXu9cSNl3C1-Y-5qk8MhSCM";

declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;

  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )} 
    &key=${googleApi}`
    )
    .then((response: any) => {
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      
      const coordinates = response.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map"),{
        center: coordinates,
        zoom: 8
      });
      
      new google.maps.Marker({position:coordinates ,map:map})

    })
    .catch((err: any) => {
      alert(err.message);
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);
