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


function openModal(){
    const modal=document.querySelector(".modal")
    modal.style.display="flex";
    const overlay=document.querySelector(".overlay")
    overlay.style.display="flex";
    const photoInput = document.getElementById("url")
    photoInput.addEventListener("change", onInputChange)
    const defImage = document.createElement("img")
    defImage.src="resurse/Image.svg";
    defImage.className = "defImage"
    const preview = document.querySelector(".preview")
    preview.replaceChildren(defImage)
}

function closeModal(){
    const modal=document.querySelector(".modal")
    modal.style.display="none";
    const overlay=document.querySelector(".overlay")
    overlay.style.display="none";
    const url=document.getElementById("url")
    url.value = "";
    const city=document.getElementById("city")
    city.value = "";
    const background = document.querySelector(".preview");
    background.style.backgroundImage = `unset`
}

function onInputChange(event){
  const photo = event.target.value;
  const background = document.querySelector(".preview");
  const defaultImage = document.querySelector(".defImage");
  background.removeChild(defaultImage);
  background.style.backgroundImage = `url( '${photo}')`
  background.style.backgroundSize = `cover`
  background.style.backgroundRepeat = `none`
}

let arrayOfCities=JSON.parse(localStorage.getItem("cities"))||[] 

function addCities(){
    const cityName=document.getElementById("city").value
    const photoUrl=document.getElementById("url").value
    arrayOfCities.push({name:cityName,url:photoUrl})
   
    localStorage.setItem("cities",JSON.stringify(arrayOfCities))
    init()
    
}
window.addEventListener('load', (event) => {
    init()
  });


function init(){
    const div=document.querySelector(".imgs")
    div.innerHTML=""
    arrayOfCities.forEach((city)=>{
        renderCities(city)
    })
    const pOras = document.getElementById("Oras")
    pOras.innerHTML = arrayOfCities[0].name
}



function renderCities(city){
    const div=document.querySelector(".imgs")
    const img=document.createElement("img")
    // <img>
    img.setAttribute("src", city.url)   
    img.style.objectFit = `cover`
    const divP=document.createElement("div")
    divP.setAttribute("class","Poze")
    divP.onclick = () => LMAO_XD(city)
    const p=document.createElement("p")
    p.textContent = city.name;
    p.setAttribute("class","City")
    divP.appendChild(img)
    divP.appendChild(p)
    div.appendChild(divP)
    closeModal() 
}

function LMAO_XD(city){
    selectedCity = city;
    const pOras = document.getElementById("Oras")
    pOras.innerHTML = city.name;
   
}

function deleteCity(){
  arrayOfCities = arrayOfCities.filter((city)=> {
   
    return city.name !== selectedCity.name
  })
  localStorage.setItem("cities",JSON.stringify(arrayOfCities))

  init()
}

let selectedCity = arrayOfCities[0];

