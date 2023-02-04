"use strict";
const afficheTitre = document.querySelector("h1")
const afficheBoard = document.querySelector("#board")


const recupDonnees = ((ville) =>{
        fetch (`https://transport.opendata.ch/v1/stationboard?station=${ville}&limit=10`)
    .then((resultat) => { 

        // ON GÈRE L'ERREUR DE VILLE INEXISTANTE
        if (resultat.status === 404){
            throw new Error("Oupss.")} 
        // **************************************
        return resultat.json()})
    .then((data) => {

        // ON GÈRE L'ERREUR 404 
        if (data.stationboard.length === 0){
            throw new Error(
                afficheTitre.innerHTML = "Oupss...ce n'est pas une ville ! "
            )}
        // *********************

        data.stationboard.forEach((element) => affichage(element));
        afficheTitre.innerHTML = ville
    })
    
    // GERE TOUTES LES ERREURS DANS LA CONSOLE
    // On le met toujours à la fin dès qu'on traite une erreur. 
    .catch((err) => {
        console.log(err.message);
      });
    // **************************

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
