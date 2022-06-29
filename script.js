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

const req = fetch('https://restcountries.eu/rest/v2/name/portugal');
console.log(req);

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

const getCountry = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(resp => resp.json())
    .then(data => {
      renderCountry(data[0]);
      const neig = data[0].borders[0];

      if (!neig) return;

      //   Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neig}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountry('portugal');
