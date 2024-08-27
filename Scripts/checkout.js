import { cartData } from "../Data/cartData.js";
import { calcuCartTotalPrice, totalPrice } from "../Utils/calcuCartPrice.js";
import { donationData } from "../Data/dontationData.js";
import { popMenu } from "../Utils/pop-menu.js";

calcuCartTotalPrice();
popMenu();

document.querySelector(".orders").innerHTML = cartData
  .map((order) => {
    let productMatch;
    donationData.forEach((elem) => {
      if (elem.id === order.productId) {
        productMatch = elem;
      }
    });
    console.log(cartData);

    return `<div class="order">
    <div class="name">${productMatch.title}</div>
    <div class="unit-price">Donation</div>
    <div class="ext-price">$${order.price.toFixed(2)}</div>
  </div>
`;
  })
  .join("");

document.querySelector(".order-bottom").innerHTML = ` <h4>Checkout Total:</h4>
<h4>$${totalPrice.toFixed(2)}</h4>`;

// let country = geoplugin_countryName();
let country = "United States";

if (country === "United States") {
  document.querySelector(".us").checked = true;
  document.querySelector(".country-code").innerHTML = `+1`;
  document.querySelector(
    ".section-cont"
  ).innerHTML = `<option>United States</option>`;
} else {
  document.querySelector(".international").checked = true;
  getCountryList();
  getCountryCurCode();
}

document.getElementsByName("1").forEach((elem) => {
  elem.addEventListener("change", () => {
    const id = elem.dataset.id;
    if (id === "1") {
      document.querySelector(".us").checked = true;
      document.querySelector(".country-code").innerHTML = `+1`;
      document.querySelector(
        ".section-cont"
      ).innerHTML = `<option>United States</option>`;
    } else {
      document.querySelector(".international").checked = true;
      getCountryList();
      getCountryCurCode();
    }
  });
});

async function getCountryList() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  document.querySelector(
    ".section-cont"
  ).innerHTML = `<option value=${country}>${country}</option>`;

  const countryList = [];

  data
    .map((country) => {
      return countryList.push(country.name.common);
    })
    .join("");

  document.querySelector(".section-cont").innerHTML += countryList
    .filter((c) => !c.includes("United States"))
    .sort()
    .map((country) => {
      return `<option value="${country}">${country}</option>`;
    })
    .join("");
}

async function getCountryCurCode() {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();

  const currCode = Number(data[0].idd.root + data[0].idd.suffixes);
  document.querySelector(".country-code").innerHTML = `+${currCode}`;
}

document.querySelector(".section-cont").addEventListener("change", () => {
  const selectValue = document.querySelector(".section-cont").value;

  country = selectValue;
  getCountryList();
  getCountryCurCode();
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("dcdicdjhc");
});

// const key = "607e85f12213419ea44c27df189ee7fb";
// ExternalCode
// Check if geolocation is supported by the browser
// if ("geolocation" in navigator) {
//   // Prompt user for permission to access their location
//   navigator.geolocation.getCurrentPosition(
//     // Success callback function
//     (position) => {
//       // Get the user's latitude and longitude coordinates
//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;

//       // Do something with the location data, e.g. display on a map
//       console.log(`Latitude: ${lat}, longitude: ${lng}`);
//       fetch(
//         // `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=f55318def8fb4fed811e6d2525c7f340`
//         `https://api.geoapify.com/v1/ipinfo?apiKey=f55318def8fb4fed811e6d2525c7f340`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           // const country = data.results[0].address_components.find((component) =>
//           //   component.types.includes("country")
//           // ).long_name;
//           // console.log("Country: ", country);
//           console.log(data);
//         })
//         .catch((error) => console.error("Error:", error));
//     },
//     // Error callback function
//     (error) => {
//       // Handle errors, e.g. user denied location sharing permissions
//       console.error("Error getting user location:", error);
//     }
//   );
// } else {
//   // Geolocation is not supported by the browser
//   console.error("Geolocation is not supported by this browser.");
// }
