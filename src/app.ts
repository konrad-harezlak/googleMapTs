import axios from "axios";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const googleApi = "AIzaSyBtp_putpyNoXu9cSNl3C1-Y-5qk8MhSCM";
type GoogleGeocodingResponse = {
  results: {geometry:{location:{lat:number, lng: number}}}[]
}
function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;

  axios.get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )} 
    &key=${googleApi}`
    ) 
    .then((response: any) => {
        console.log(response)
        const coordinates = response.data.result[0].geometry.location;
    }) 
    .catch((err: any) => {
      console.log(err);
    });
} 
form.addEventListener("submit", searchAddressHandler);
