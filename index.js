function createImg(){
    const div=document.querySelector(".imgs")
    const img=document.createElement("img")
    img.setAttribute("src", "resurse/City.svg")
    const divP=document.createElement("div")
    divP.setAttribute("class","Poze")
    const p=document.createElement("p")
    p.textContent = 'New York, USA'
    p.setAttribute("class","City")
    divP.appendChild(img)
    divP.appendChild(p)
    div.appendChild(divP)

}

function openModal(){
    
}