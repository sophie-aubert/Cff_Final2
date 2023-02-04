"use strict";
const afficheTitre = document.querySelector("h1")
const afficheBoard = document.querySelector("#board")

const recupDonnees = ((ville) =>{
    fetch (`https://transport.opendata.ch/v1/stationboard?station=${ville}&limit=10`)
    .then((resultat) => { 
        return resultat.json()})
    .then((data) => {
        data.stationboard.forEach((element) => affichage(element));
        afficheTitre.innerHTML = data.station.name
    })
})

recupDonnees("lausanne");

const affichage = (villeEntree) => {

const time = new Date(villeEntree.stop.departure);
const minute = time.getMinutes().toString().padStart(2, '0');
const heure = time.getHours();

    const html = `<article>
    <div class="time">${heure + ":" + minute}</div>
    <div class="category" data-category="${villeEntree.category}">${villeEntree.category}</div>
    <div class="destination">${villeEntree.to}</div>
</article>`;

afficheBoard.insertAdjacentHTML("beforeend", html);
}