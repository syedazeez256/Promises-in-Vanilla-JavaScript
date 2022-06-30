'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data) {
  console.log(data);
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages.por}</p>
        <p class="country__row"><span>💰</span>${data.currencies.EUR.name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const req = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(req);

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (resp) {
//       console.log(resp);
//       return resp.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       throw new Error(`${errorMsg} (${response.status})`);
//     }
//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       resp => {
//         console.log(resp);

//         if (!resp.ok) throw new Error(`Country not found (${resp.status})`);

//         return resp.json();
//       }
//       //   err => alert(err)
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neig = data[0].borders[0];

//       if (!neig) return;

//       //   Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neig}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`${err} Errors`);
//       renderError(`Something went wrong ${err.message}, Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neig = data[0].borders[0];

//       //   const neig = 'kkkkk';
//       if (!neig) throw new Error('No neighbour found!');

//       //   Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neig}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => {
//       console.log(`${err} Errors`);
//       renderError(`Something went wrong ${err.message}, Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountry('portugal');
// });

// Showing Country by its Coordinates//
const whereAmI = function (lat, lon) {
  fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
    .then(response => {
      console.log(response);
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);
      response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country} `);

      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(resp => {
      if (!resp.ok) throw new Error(`Country not found (${resp.status})`);

      return resp.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(err.message);
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
