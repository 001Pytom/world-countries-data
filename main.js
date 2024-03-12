const populationBtn = document.querySelector(".population_btn");
const languageBtn = document.querySelector(".language_btn");
const countriesnum = document.querySelector(".countries_num");
const nameContainer = document.querySelector(".country_names");
const langContainer = document.querySelector(".language_names");
const graphContainer = document.querySelector(".population_graph");
const graphContainer2 = document.querySelector(".population_graph2");
const population = document.querySelector(".population");
const langNum = document.querySelector(".language_number");
const populationH4 = document.querySelector(".population_h4");
const populationMain = document.querySelector(".population_container");
const languageMain = document.querySelector(".language_container");
const btnTypeselected = document.querySelector(".btn_type_selected");

// Variables
let countryinfo = [];
let totalPopulation = 0;

// functions
// Transform population to percentage
let populationToPercentage = (oneCountryPopulation) => {
  return (oneCountryPopulation / totalPopulation) * 100;
};

//   get each country and population
countries.forEach((country) => {
  const { name, population } = country;
  countryinfo.push({ eachcountry: name, eachpopulation: population });
});
countryinfo.sort((a, b) => b.eachpopulation - a.eachpopulation);
let newCountryinfo = countryinfo.slice(0, 10);

// calc total population
totalPopulation = countryinfo.reduce((acc, country) => {
  return acc + country.eachpopulation;
}, 0);

//
populationH4.textContent = totalPopulation;
newCountryinfo.forEach((info) => {
  const oneCountry = info.eachcountry;
  const oneCountryPopulation = info.eachpopulation;

  const p = document.createElement("P");
  p.textContent = oneCountry;
  nameContainer.appendChild(p);

  const graphDiv = document.createElement("div");
  graphDiv.classList.add("graph_div");
  graphDiv.style.width = `${populationToPercentage(oneCountryPopulation)}%`;
  graphContainer.append(graphDiv);

  const eachPopulation = document.createElement("p");
  eachPopulation.textContent = oneCountryPopulation;
  population.appendChild(eachPopulation);
});

// for languages
// Flatten the array of languages
const allLanguages = countries.flatMap((obj) => obj.languages);
// Count the occurrences of each language
const languageCounts = {};
allLanguages.forEach((lang) => {
  languageCounts[lang] = (languageCounts[lang] || 0) + 1;
});

// Convert the object into an array of objects
const languageArray = Object.entries(languageCounts).map(
  ([language, count]) => ({ language, count })
);

// Sort the languages by their occurrences
languageArray.sort((a, b) => b.count - a.count);

// Select the top 10 languages
const top10Languages = languageArray.slice(0, 10);

// display the top 10 languages along with their counts
top10Languages.forEach((lang) => {
  const language = lang.language;
  const langCount = lang.count;

  const p = document.createElement("P");
  p.textContent = language;
  langContainer.appendChild(p);

  const graphDiv2 = document.createElement("div");
  graphDiv2.classList.add("graph_div");
  graphDiv2.style.width = `${langCount}%`;
  graphContainer2.append(graphDiv2);

  const eachLang = document.createElement("p");
  eachLang.textContent = langCount;
  langNum.appendChild(eachLang);
  // console.log(`${lang.language}: ${lang.count}`);
});

populationBtn.addEventListener("click", () => {
  languageMain.style.display = "none";
  populationMain.style.display = "flex";
  btnTypeselected.textContent = "populated countries";
});
languageBtn.addEventListener("click", () => {
  populationMain.style.display = "none";
  languageMain.style.display = "flex";
  btnTypeselected.textContent = "Spoken languages";
});


