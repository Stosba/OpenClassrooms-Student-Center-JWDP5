/*index.js*/

// /*Alerte carte de crédit*/
// document.querySelector(".myCard").addEventListener("mousemove", function(){
//     document.querySelector(".alertIndex").style.display = "block";
// });

// Liste des produits méthode 1
// getAllTeddies = () => {
//   return new Promise((resolve) => {
//     let request = new XMLHttpRequest();
//     request.onreadystatechange = function () {
//       if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status < 400) {
//         resolve(JSON.parse(this.responseText));
//         console.log("Connecté");
//         document.querySelector('#card1').innerHTML = response.images.teddy_1.jpg;
//         document.querySelector('#card2').innerHTML = response.images.teddy_2.jpg;
//         document.querySelector('#card3').innerHTML = response.images.teddy_3.jpg;
//         document.querySelector('#card4').innerHTML = response.images.teddy_4.jpg;
//         document.querySelector('#card5').innerHTML = response.images.teddy_5.jpg;
//       } else {
//         console.log("error");
//         document.querySelector('#error').style.display = 'block';
//       }
//     };
//     request.open("GET", "http://localhost:3000/api/teddies/" + idNounours);
//     request.send();
//   });
// };

// Liste des produits méthode 2

  get("http://localhost:3000/api/teddies/").then(teddies => {
    console.log(teddies)
    displayTeddies(teddies)
  })

  function displayTeddies(teddies) {
    // const teddies = await getAllTeddies();

     /* Lien avec la page index HTML */

    let listeProduit = document.getElementById("listeProduit");

    /* création de la structure index HTML */
    teddies.forEach((teddy) => {
      let produitContenant = document.createElement("section");
      let produitIllustration = document.createElement("div");
      let produitElement = document.createElement("div");
      let produitPhoto = document.createElement("img");
      let produitNom = document.createElement("h3");
      let produitPrix = document.createElement("p");
      let produitAction = document.createElement("a");
  
      /*Ajout des attributs au balise index HTML */
      produitContenant.setAttribute("class", "produit_contenant");
      produitIllustration.setAttribute("class", "produit_illustration");
      produitPhoto.setAttribute("src", teddy.imageUrl);
      produitPhoto.setAttribute("alt", "Photo de l'ours en peluche");
      produitElement.setAttribute("class", "produit_element");
      produitNom.setAttribute("class", "produit_nom");
      produitPrix.setAttribute("class", "produit_prix");
      produitAction.setAttribute("href", "produit.html?id=" + teddy._id);
  
      /* Agencement des éléments index HTML */
      listeProduit.appendChild(produitContenant);
      produitContenant.appendChild(produitIllustration);
      produitIllustration.appendChild(produitPhoto);
      produitContenant.appendChild(produitElement);
      produitElement.appendChild(produitNom);
      produitElement.appendChild(produitPrix);
      produitElement.appendChild(produitAction);
  
      /* Contenu des balises index HTML */
      produitNom.textContent = teddy.name;
      produitPrix.textContent = teddy.price / 50 + " euros";
      produitAction.textContent = "En savoir plus";
    });
  }