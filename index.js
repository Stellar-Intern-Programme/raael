// function createImg(){
//     const div=document.querySelector(".imgs")
//     const img=document.createElement("img")
//     img.setAttribute("src", "resurse/City.svg")
//     const divP=document.createElement("div")
//     divP.setAttribute("class","Poze")
//     const p=document.createElement("p")
//     p.textContent = 'New York, USA'
//     p.setAttribute("class","City")
//     divP.appendChild(img)
//     divP.appendChild(p)
//     div.appendChild(divP)

let searchInput;

let index = 0;
// import weather from"./weather.json" assert {type: "json"}

let weather;
fetch("./weather.json")
  .then((res) => res.json())
  .then((data) => {
    weather = data;
    renderWeather();
  });

function openModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "flex";
  const photoInput = document.getElementById("url");
  photoInput.addEventListener("change", onInputChange);
  const defImage = document.createElement("img");
  defImage.src = "resurse/Image.svg";
  defImage.className = "defImage";
  const preview = document.querySelector(".preview");
  preview.replaceChildren(defImage);
  const audio = document.querySelector("#audio");
  audio.play();
}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "none";
  const url = document.getElementById("url");
  url.value = "";
  const city = document.getElementById("city");
  city.value = "";
  const background = document.querySelector(".preview");
  background.style.backgroundImage = `unset`;
}

function onInputChange(event) {
  const photo = event.target.value;
  const background = document.querySelector(".preview");
  const defaultImage = document.querySelector(".defImage");
  background.removeChild(defaultImage);
  background.style.backgroundImage = `url( '${photo}')`;
  background.style.backgroundSize = `cover`;
  background.style.backgroundRepeat = `none`;
}

let arrayOfCities = JSON.parse(localStorage.getItem("cities")) || [];

function addCities() {
  const cityName = document.getElementById("city").value;
  const photoUrl = document.getElementById("url").value;
  arrayOfCities.push({ name: cityName, url: photoUrl });

  localStorage.setItem("cities", JSON.stringify(arrayOfCities));
  init();
}
window.addEventListener("load", () => {
  init();
  renderWeatherData(Object.keys(weather)[0]);
  searchInput = document.getElementById("search");
  // searchInput.addEventListener("keyup", suggestions);
});

function init(searchParam) {
  const div = document.querySelector(".imgs");

  div.innerHTML = "";
  arrayOfCities
    .filter((city) => {
      if (searchParam) return city.name === searchParam;
      else return true;
    })
    .forEach((city) => {
      renderCities(city);
    });
  window.addEventListener("load", (event) => {
    init();
  });
}

function init() {
  const div = document.querySelector(".imgs");
  div.innerHTML = "";
  arrayOfCities.forEach((city) => {
    renderCities(city);
  });
  const pOras = document.getElementById("Oras");
  pOras.innerHTML = arrayOfCities[0].name;
}

function renderCities(city) {
  const div = document.querySelector(".imgs");
  const img = document.createElement("img");
  // <img>
  img.setAttribute("src", city.url);
  img.style.objectFit = `cover`;
  const divP = document.createElement("div");
  divP.setAttribute("class", "Poze");
  divP.onclick = () => LMAO_XD(city);
  const p = document.createElement("p");
  p.textContent = city.name;
  p.setAttribute("class", "City");
  divP.appendChild(img);
  divP.appendChild(p);
  div.appendChild(divP);
  closeModal();
}

function LMAO_XD(city) {
  selectedCity = city;
  const pOras = document.getElementById("Oras");
  pOras.innerHTML = city.name;
}

function deleteCity() {
  arrayOfCities = arrayOfCities.filter((city) => {
    return city.name !== selectedCity.name;
  });
  localStorage.setItem("cities", JSON.stringify(arrayOfCities));

  init();
}

let selectedCity = arrayOfCities[0];
function regenerate(event) {
  if (event.value === "") init();
}

function searchinline(event) {
  const imgs = document.getElementsByClassName("imgs")[0];
  searchArray = arrayOfCities.filter((e) =>
    e.name.toLowerCase().includes(event.value)
  );
  imgs.innerHTML = "";
  searchArray.forEach((e) => renderCities(e));
  regenerate(event);
}

function renderWeather() {
  Object.keys(weather).forEach((item, key) => {
    const p = document.createElement("p");
    const divP = document.querySelector(".Buttons");
    p.textContent = item;
    p.setAttribute("class", "Buttons");
    if (key === 0) {
      p.classList = "Buttons active";
    }

    divP.appendChild(p);
    p.addEventListener("click", () => {
      const children = divP.children;
      for (let i = 0; i < children.length; i++) {
        children[i].className = "Buttons";
      }

      p.classList = "Buttons active";
      renderWeatherData(item);
    });
  });
}

window.addEventListener("keyup", logKey);

function logKey(ev) {
  // if (ev.keyCode === 40) index++;

  // if (ev.keyCode === 38) index--;
  // suggestions();
  if (ev.keyCode === 13) search();
}

function suggestions(data) {
  const divSuggestions = document.querySelector(".suggestions");
  const wrapper = document.querySelector(".wrapper");
  divSuggestions.innerHTML = "";

  const suggestionsArray = data.list
  suggestionsArray.forEach((suggestions, i) => {
    const pSuggestions = document.createElement("p");
    pSuggestions.innerHTML = suggestions.name;
    if (i === index) {
      pSuggestions.style.background = "gray";
    }
    divSuggestions.appendChild(pSuggestions);
    divSuggestions.style.display = "flex";
    wrapper.style.borderRadius = "0px";
    wrapper.style.borderTopRightRadius = "20px";
    wrapper.style.borderTopLeftRadius = "20px";

    // pSuggestions.onclick = function da() {
    //   // searchArray = arrayOfCities.filter(e => e.name.toLowerCase().includes(pSuggestions.innerHTML))
    //   input.value = suggestions.name;
    //   init(suggestions.name);
    //   // searchArray.forEach(e=>renderCities(e))
    //   // regenerate(ev)
    // };
    pSuggestions.onclick=() =>onecall(suggestions)
  });
  if (value == "") {
    divSuggestions.style.display = "none";
    wrapper.style.borderRadius = "20px";
  }
}

function suggestionsOff() {
  const divSuggestions = document.querySelector(".suggestions");
  const wrapper = document.querySelector(".wrapper");
  divSuggestions.style.display = "none";
  wrapper.style.borderRadius = "20px";
  index = 0;
}

function renderWeatherData(click) {
  const data = weather[click];
  console.log(data);
  const table = document.getElementsByClassName("Table")[0];
  table.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement("tr");
    const tdzi = document.createElement("td");
    const tdpic = document.createElement("td");
    const tdnor = document.createElement("td");
    const tdminmax = document.createElement("td");
    const ppic = document.createElement("p");
    const imgpic = document.createElement("img");
    const imgnor = document.createElement("img");
    const pmin = document.createElement("p");
    const pmax = document.createElement("p");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    tdzi.innerHTML = data[i].day;
    ppic.innerText = data[i].rainChance + "%";
    imgpic.setAttribute("src", "resurse/Picatura.svg");
    tdpic.appendChild(imgpic);
    tdpic.appendChild(ppic);
    imgnor.setAttribute("src", "resurse/Fulger.svg");
    tdnor.appendChild(imgnor);
    // tdminmax.innerHTML=`${data[i].minDegrees}<div class="Rectangle"><div class="Rectangle2"></div></div> ${data[i].maxDegrees}`
    pmin.innerText = data[i].minDegrees;
    pmax.innerText = data[i].maxDegrees;
    div1.setAttribute("class", "Rectangle");
    div2.setAttribute("class", "Rectangle2");
    div1.appendChild(div2);
    tdminmax.appendChild(pmin);
    tdminmax.appendChild(div1);
    tdminmax.appendChild(pmax);
    tr.appendChild(tdzi);
    tr.appendChild(tdpic);
    tr.appendChild(tdnor);
    tr.appendChild(tdminmax);
    console.log(tr);
    table.appendChild(tr);
  }
}

function amongUsPopUp() {
  const sus = document.getElementById("susLmao");
  sus.style.display = "flex";
  setTimeout(hideAmongUsPopUp, 1900);
}

function hideAmongUsPopUp() {
  const sus = document.getElementById("susLmao");
  sus.style.display = "none";
}

const API_KEY = "6a46d8f38913f1e370228f934ad28c03";

function search() {
const value=document.getElementById("search").value

    fetch(
      "https://api.openweathermap.org/data/2.5/find?q="+value+"&APPID=" + API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        suggestions(data)
      });

}
function onecall(suggestions){

  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat="+suggestions.coord.lat + "&lon="+ suggestions.coord.lon+"&APPID=" + API_KEY 
  )
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    clickOnCity()
  });
}

function clickOnCity(){
  const divSuggestions = document.querySelector(".suggestions");
  divSuggestions.innerHTML = "";
  const cityName = document.getElementById("search").value;
  
  arrayOfCities.push({ name: cityName });

  localStorage.setItem("cities", JSON.stringify(arrayOfCities));
  init();
  
}