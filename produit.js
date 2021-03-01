/*Produit*/

// Récupération de l'id du produit sélectionné dans la page précédente
const productId = window.location.search.substr(1); 
console.log(productId);

// Récupération du produit avec l'id associé depuis le serveur
get(`http://localhost:3000/api/teddies/${productId}`)
    .then(response => {
        
//   Lien avec la page produit HTML
  let detailProduit = document.getElementById("detailProduit");

//   création de la structure produit HTML
  let detailTitle = document.createElement("h2");
  let detailElement = document.createElement("div");
  let detailIllustration = document.createElement("div");
  let detailPhoto = document.createElement("img");
  let detailDescription = document.createElement("p");
  let detailInformationPrix = document.createElement("div");
  let detailPrix = document.createElement("p");
  let detailOption = document.getElementById("detailOption");
  let detailAction = document.getElementById("ajout_panier");

//   Ajout des attributs au balise produit HTML
  detailTitle.setAttribute("class", "card-title");
  detailElement.setAttribute("class", "detail_element");
  detailIllustration.setAttribute("class", "detail_illustration");
  detailPhoto.setAttribute("src", response.imageUrl);
  detailPhoto.setAttribute("alt", "Photo de " + response.name);
  detailPhoto.setAttribute('class', "col-12");
  detailDescription.setAttribute("class", "detail_description");
  detailInformationPrix.setAttribute("class", "detail_information_prix");
  detailPrix.setAttribute("class", "detail_prix");

//   Agencement des éléments produit HTML
  detailProduit.appendChild(detailTitle);
  detailProduit.appendChild(detailElement);
  detailElement.appendChild(detailIllustration);
  detailIllustration.appendChild(detailPhoto);
  detailElement.appendChild(detailDescription);
  detailElement.appendChild(detailInformationPrix);
  detailElement.appendChild(detailPrix);
  detailElement.appendChild(detailOption);
  detailElement.appendChild(detailAction);

//   Contenu des balises produit HTML
  detailTitle.textContent = response.name;
  detailDescription.textContent = response.description;
  detailPrix.textContent = response.price / 100 + " €";

  response.colors.forEach((teddy) => {
    let choixOption = document.createElement("option");
    document
      .getElementById("choix_option")
      .appendChild(choixOption).innerHTML = teddy;
    })
});

//Ajout de l'article au panier de l'utilisateur

ajoutPanier = () => {
  let acheter = document.getElementById("ajout_panier");
  acheter.addEventListener("click", async function () {
    const ajout = await get(`http://localhost:3000/api/teddies/${productId}`);
    panier.push(ajout);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log("Le produit a été ajouté au panier");
    // alert ajout au panier
    let panierAdd = document.getElementById("panierAdd");
    let alertProduit = document.createElement("div");
    panierAdd.appendChild(alertProduit);
    alertProduit.setAttribute('class', 'alert alert-success alert-dismissible fade show my-2');
    alertProduit.setAttribute("role", "alert");
    alertProduit.innerHTML = "Félicitations ! Article enregistré dans le panier !"
    nombreIndexPanier();
    nombreProduitPanier();
  });
};
ajoutPanier();

// Affichage du nombre d'article dans le panier

let panier = JSON.parse(localStorage.getItem("panier"));

function nombreProduitPanier() {
  let produitPanier = document.getElementById("produitPanier");
  produitPanier.textContent = panier.length;
}
nombreProduitPanier();