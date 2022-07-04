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

// }

let searchInput;

let index = 0;

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
  const audio = document.querySelector('#audio')
  audio.play()
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
  searchInput = document.getElementById("search");
  searchInput.addEventListener("keyup", suggestions);
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

function search(event) {
  const imgs = document.getElementsByClassName("imgs")[0];
  searchArray = arrayOfCities.filter((e) =>
    e.name.toLowerCase().includes(event.value)
  );
  imgs.innerHTML = "";
  searchArray.forEach((e) => renderCities(e));
  regenerate(event);
}

function suggestions() {
  const input = document.querySelector(".Placeholder");

  const value = input.value;
  console.log(value);
  const divSuggestions = document.querySelector(".suggestions");
  const wrapper = document.querySelector(".wrapper");
  divSuggestions.innerHTML = "";

  const suggestionsArray = arrayOfCities.filter((city) =>
    city.name.toLowerCase().includes(value)
  );
  suggestionsArray.forEach((suggestions,i) => {
    const pSuggestions = document.createElement("p");
    pSuggestions.innerHTML = suggestions.name;
    if(i===index){
      pSuggestions.style.background = "blue"
    }
    divSuggestions.appendChild(pSuggestions);
    divSuggestions.style.display = "flex";
    wrapper.style.borderRadius = "0px";
    wrapper.style.borderTopRightRadius = "20px";
    wrapper.style.borderTopLeftRadius = "20px";

    pSuggestions.onclick = function da() {
      // searchArray = arrayOfCities.filter(e => e.name.toLowerCase().includes(pSuggestions.innerHTML))
      input.value = suggestions.name;
      init(suggestions.name);
      // searchArray.forEach(e=>renderCities(e))
      // regenerate(ev)
    };
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

window.addEventListener("keyup", logKey);

// function selectSuggestion(){
//   const
// }

function logKey(ev) {
  if (ev.keyCode === 40) index++;
  
  if(ev.keyCode === 38) index--;
  // if(ev.keyCode === 13)
  suggestions()
}
