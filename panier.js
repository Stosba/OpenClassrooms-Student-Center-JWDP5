// PANIER

//Panier de l'utilisateur
let panier = JSON.parse(localStorage.getItem("panier"));

// // Affichage du nombre d'article dans le panier

// function nombreIndexPanier() {
//   let indexPanier = document.getElementById("indexPanier");
//   indexPanier.textContent = panier.length;
// }

// function nombreProduitPanier() {
//   let produitPanier = document.getElementById("produitPanier");
//   produitPanier.textContent = panier.length;
// }

//Vérification et initialisation du panier
if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

// Page Panier

panierCreation = () => {
    if (panier.length > 0) {
      document.getElementById("panierVide").remove();

      //Création de la structure du tableau récapitulatif
      let recap = document.createElement("table");
      let ligneTableau = document.createElement("tr");
      let recapPhoto = document.createElement("th");
      let recapNom = document.createElement("th");
      let recapPrixUnitaire = document.createElement("th");
      let recapRemove = document.createElement("th");
      let ligneTotal = document.createElement("tr");
      let colonneTotal = document.createElement("th");
      let recapPrixPaye = document.createElement("td");
  
      //Placement de la structure dans la page
      let recapPanier = document.getElementById("panier-recap");
      recapPanier.appendChild(recap);
      recap.appendChild(ligneTableau);
      ligneTableau.appendChild(recapPhoto);
      ligneTableau.appendChild(recapNom);
      ligneTableau.appendChild(recapPrixUnitaire);
      ligneTableau.appendChild(recapRemove);
  
      //contenu des entetes
      recapPhoto.textContent = "Article";
      recapNom.textContent = "Nom";
      recapPrixUnitaire.textContent = "Prix";
      recapRemove.textContent = "Annuler ?";
      
   //Boucle FOR pour affichage des articles dans le panier
       
      for (let i = 0; i<panier.length; i++) {
      
        //Création des lignes du tableau
        let ligneArticle = document.createElement("tr");
        let photoArticle = document.createElement("img");
        let nomArticle = document.createElement("td");
        let prixUnitArticle = document.createElement("td");
        let supprimerArticle = document.createElement("td");
        let removeArticle = document.createElement("i");
  
        //Attribution des class ou Id
        recapPanier.setAttribute("class", "card p-4 mx-auto");
        ligneArticle.setAttribute("id", "article" + [i]);
        photoArticle.setAttribute("class", "photo_article img-fluid");
        photoArticle.setAttribute("src", panier[i].imageUrl);
        photoArticle.setAttribute("alt", "Photo de l'article commandé");
        removeArticle.setAttribute("id", "remove" + [i]);
        removeArticle.setAttribute("class", "btn btn-secondary");
        removeArticle.setAttribute("title", "Supprimer article ?");
        removeArticle.textContent = "Supprimer";
        ligneArticle.setAttribute("class", "mx-auto");
        nomArticle.setAttribute("class", "p-2");
        prixUnitArticle.setAttribute("class", "p-2");
  
        console.log(i);
  
  //Supprimer un produit du panier
     removeArticle.addEventListener("click", (event) => {this.annulerArticle(i);}) 
  
        //Agencement de la structure HTML
        recap.appendChild(ligneArticle);
        ligneArticle.appendChild(photoArticle);
        ligneArticle.appendChild(nomArticle);
        ligneArticle.appendChild(prixUnitArticle);
        ligneArticle.appendChild(supprimerArticle);
        supprimerArticle.appendChild(removeArticle);
  
        //Contenu de chaque ligne
        nomArticle.textContent = panier[i].name;
        prixUnitArticle.textContent = panier[i].price / 100 + "€";
        console.log(panier[i].name);
      };
  
      //Dernière ligne du tableau : Total
      recap.appendChild(ligneTotal);
      ligneTotal.appendChild(colonneTotal);
      ligneTotal.setAttribute("id", "ligneSomme");
      colonneTotal.textContent = "Total à payer";
      ligneTotal.appendChild(recapPrixPaye);
  
      recapPrixPaye.setAttribute("id", "sommeTotal");
      recapPrixPaye.setAttribute("colspan", "4");
      colonneTotal.setAttribute("id", "colonneTotal");
      colonneTotal.setAttribute("colspan", "2");
  
      //Calcule de l'addition total
      let sommeTotal = 0;
      panier.forEach((panier) => {
        sommeTotal += panier.price / 100;
      });
  
      //Affichage du prix total à payer dans l'addition
      console.log(sommeTotal);
      document.getElementById("sommeTotal").textContent = sommeTotal + "€";
      // stockage du prix total
      sessionStorage.setItem("sommeTotal", JSON.stringify(sommeTotal));
    }
  };
panierCreation();

  annulerArticle = (i) => {
   panier.splice(i, 1);
    localStorage.clear();
    // Mise à jour du nouveau panier avec suppression de l'article
    localStorage.setItem("panier", JSON.stringify(panier));
    //Mise à jour de la page pour affichage de la suppression au client
    window.location.reload();
  };

  // FORMULAIRE

//vérifie les inputs du formulaire
checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //Récupération des inputs
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;

  //tests des différents input du formulaire
  //Test du nom
  if (checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true || nom == "") {
    document.getElementById('invalidName').style.display = "block";
    document.getElementById('validName').style.display = "none";
  } else {
    console.log("Nom accepté");
    document.getElementById('invalidName').style.display = "none";
    document.getElementById('validName').style.display = "block";
  }
  //Test du prénom
  if (checkNumber.test(prenom) == true || checkSpecialCharacter.test(prenom) == true || prenom == "") {
    document.getElementById('invalidFirstname').style.display = "block";
    document.getElementById('validFirstname').style.display = "none";
  } else {
    console.log("Prénom accepté");
    document.getElementById('invalidFirstname').style.display = "none";
    document.getElementById('validFirstname').style.display = "block";
  }
  //Test du mail
  if (checkMail.test(email) == false) {
    document.getElementById('invalidMail').style.display = "block";
    document.getElementById('validMail').style.display = "none";
  } else {
    console.log("Adresse mail acceptée");
    document.getElementById('invalidMail').style.display = "none";
    document.getElementById('validMail').style.display = "block";
  }
  //Test de l'adresse
  if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
    document.getElementById('invalidAdress').style.display = "block";
    document.getElementById('validAdress').style.display = "none";
  } else {
    console.log(" Adresse postale acceptée");
    document.getElementById('invalidAdress').style.display = "none";
    document.getElementById('validAdress').style.display = "block";
  }
  //Test de la ville
  if ((checkSpecialCharacter.test(ville) == true || checkNumber.test(ville) == true) || ville == "") {
    document.getElementById('invalidCity').style.display = "block";
    document.getElementById('validCity').style.display = "none";
  } else {
    console.log("Ville acceptée");
    document.getElementById('invalidCity').style.display = "none";
    document.getElementById('validCity').style.display = "block";
  }
  //Si un des champs n'est pas conforme => message d'alert avec la raison
  if (checkNumber.test(nom) == true || checkSpecialCharacter.test(nom) == true || nom == "" || 
    checkNumber.test(prenom) == true || checkSpecialCharacter.test(prenom) == true || prenom == "" ||
    checkMail.test(email) == false ||
    checkSpecialCharacter.test(adresse) == true || adresse == ""||
    (checkSpecialCharacter.test(ville) == true || checkNumber.test(ville) == true) || ville == "") 
    {
    document.getElementsByClassName('invalid-feedback').style.display = 'block';
  }
  //Si le formulaire est valide, construction de l'objet contact
  else {
    contact = {
      firstName: prenom,
      lastName: nom,
      address: adresse,
      city: ville,
      email: email,
    };
    return contact;
  }
};

//Vérification du panier
checkPanier = () => {
  //Vérifier qu'il y ait au moins un produit dans le panier
  let etatPanier = JSON.parse(localStorage.getItem("panier"));
  //Si le panier est vide
  if  (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide");
    return false;
  } else {
    console.log("Le panier n'est pas vide");
    return true;
  }
};

/*Envoi à l'API */
//Tableau et objet demandé par l'API pour la commande
let contact;
let products = [];
let url = "http://localhost:3000/api/teddies/order";

const envoiFormulaire = (sendForm, url) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onload = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
        sessionStorage.setItem("order", this.responseText);
        window.location = "./Confirmation_de_commande.html";
        resolve(JSON.parse(this.responseText));
        console.log(sendForm);
      } else {
      }
    };
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(sendForm);
    console.log(sendForm);
  });
};

confirmCommande = () => {
  let commander = document.getElementById("form");
  commander.addEventListener("submit", (event) => {
    event.preventDefault()
    //Si le panier n'est pas vide et que le formulaire est valide => Construction du tableau products envoyé à l'API
    if (checkPanier() == true && checkInput() != null) {
      console.log("L'envoi peut etre fait");
      panier.forEach((article) => {
        products.push(article._id);
      });
      console.log("Ce tableau sera envoyé à l'API : " + products);

      //Création de l'objet à envoyer
      let commande = {
        contact,
        products,
      };

      let sendForm = JSON.stringify(commande);
      envoiFormulaire(sendForm, url);
      console.log(commande);

      //Une fois la commande effectuée retour à l'état initial des tableaux/objet/localStorage
      contact = {};
      products = [];
      localStorage.clear();
    } else {
      console.log("ERROR");
    }
  });
};
confirmCommande();