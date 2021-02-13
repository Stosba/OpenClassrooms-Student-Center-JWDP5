/*index.js*/

// Liste des produits méthode 2

  get("http://localhost:3000/api/teddies/")
  .then(teddies => {
    console.log(teddies)
    displayTeddies(teddies)
  })

  function displayTeddies(teddies) {
    // const teddies = await getAllTeddies();

    //  Lien avec la page index HTML

    let listeProduit = document.getElementById("listeProduit");

    // création de la structure index HTML
    teddies.forEach((teddy) => {
      console.log(teddy);
      let produitIllustration = document.createElement("div");
      let produitElement = document.createElement("div");
      let produitPhoto = document.createElement("img");
      let produitNom = document.createElement("h2");
      let produitPrix = document.createElement("p");
      let produitAction = document.createElement("a");
  
      // Ajout des attributs au balise index HTML
      produitIllustration.setAttribute("class", "produit_illustration col-lg-4 mb-3 mx-auto myCard");
      produitElement.setAttribute("class", "produit_element card mx-auto shadow rounded p-2");
      produitPhoto.setAttribute("src", teddy.imageUrl);
      produitPhoto.setAttribute("alt", "Photo de l'ours en peluche");
      produitNom.setAttribute("class", "produit_nom");
      produitPrix.setAttribute("class", "produit_prix");
      produitAction.setAttribute("href", `produit.html?${teddy._id}`);
      produitAction.setAttribute("class", "btn btn-secondary mb-3 shadow stretched-link");
      produitAction.setAttribute("role", "button");
  
      // Agencement des éléments index HTML
      produitContenant.appendChild(produitIllustration);
      produitIllustration.appendChild(produitElement);
      produitElement.appendChild(produitPhoto);
      produitElement.appendChild(produitNom);
      produitElement.appendChild(produitPrix);
      produitElement.appendChild(produitAction);
  
      // Contenu des balises index HTML
      produitNom.textContent = teddy.name;
      produitPrix.textContent = teddy.price / 100 + " euros";
      produitAction.textContent = "Personnalisez votre ourson";
    });
  };
  
// Alerte carte de crédit
document.querySelector('#listeProduit').addEventListener('mousemove', function(){
  document.querySelector('.alertIndex').style.display = 'block';
});

//Affichage du nombre d'article dans le panier
function nombreIndexPanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panier.length;
}