// PANIER

//  appel des fonctions

//Panier de l'utilisateur
let panier = JSON.parse(localStorage.getItem("panier"));

// Affichage du nombre d'article dans le panier

function nombreIndexPanier() {
  let indexPanier = document.getElementById("indexPanier");
  indexPanier.textContent = panier.length;
}

function nombreProduitPanier() {
  let produitPanier = document.getElementById("produitPanier");
  produitPanier.textContent = panier.length;
}

//Vérification et initialisation du panier
if (localStorage.getItem("panier")) {
  console.log(panier);
} else {
  console.log("Le panier va être initalisé");
  let panierInit = [];
  localStorage.setItem("panier", JSON.stringify(panierInit));
}

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
  });
};

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
        removeArticle.setAttribute("class", "btn btn-primary");
        removeArticle.setAttribute("title", "Supprimer article ?");
        removeArticle.textContent = "supprimer";
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
    }
  };

  annulerArticle = (i) => {
   panier.splice(i, 1);
    localStorage.clear();
    // Mise à jour du nouveau panier avec suppression de l'article
    localStorage.setItem("panier", JSON.stringify(panier));
    //Mise à jour de la page pour affichage de la suppression au client
    window.location.reload();
  };


  // FORMULAIRE

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

//vérifie les inputs du formulaire
checkInput = () => {
  //Controle Regex
  let checkNumber = /[0-9]/;
  let checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

  //message fin de controle
  let checkMessage = "";

  //Récupération des inputs
  let nom = document.getElementById("nom").value;
  let prenom = document.getElementById("prenom").value;
  let email = document.getElementById("email").value;
  let adresse = document.getElementById("adresse").value;
  let ville = document.getElementById("ville").value;

  //tests des différents input du formulaire
  //Test du nom
  if (
    checkNumber.test(nom) == true ||
    checkSpecialCharacter.test(nom) == true ||
    nom == ""
  ) {
    checkMessage = "Veuillez vérifier les informations concernant votre nom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Nom accepté");
  }
  //Test du prénom
  if (
    checkNumber.test(prenom) == true ||
    checkSpecialCharacter.test(prenom) == true ||
    prenom == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre prénom. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Prénom accepté");
  }
  //Test du mail
  if (checkMail.test(email) == false) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log("Adresse mail acceptée");
  }
  //Test de l'adresse
  if (checkSpecialCharacter.test(adresse) == true || adresse == "") {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse postale. Les caractères spéciaux ne sont pas autorisés";
  } else {
    console.log(" Adresse postale acceptée");
  }
  //Test de la ville
  if (
    (checkSpecialCharacter.test(ville) == true ||
      checkNumber.test(ville) == true) ||
    ville == ""
  ) {
    checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville. Les caractères spéciaux ou les chiffres ne sont pas autorisés";
  } else {
    console.log("Ville acceptée");
  }
  //Si un des champs n'est pas conforme => message d'alert avec la raison
  if (checkMessage != "") {
    // alert("Attention certaines données ne sont pas conformes :" + "\n" + checkMessage);
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

//Récupération des informations pour affichage sur la page de confirmation
retourOrder = () => {
  if (sessionStorage.getItem("order") != null) {
    let order = JSON.parse(sessionStorage.getItem("order"));
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("orderId").innerHTML = order.orderId;
    document.getElementById("sommeTotal").innerHTML = sommeTotal + "€";

    console.log(order);
    sessionStorage.removeItem("order");

  }
  //Redirection vers l'accueil
  else {
    alert("Merci pour vote commande. A bientôt");
    window.location = "./index.html";
  }
};

// Recapitulatif et confirmation de la commande

confirmRecap = () => {
  //Création de la structure du tableau récapitulatif
  let recapConfirm = document.createElement("table");
  let ligneConfirm = document.createElement("tr");
  let confirmPhoto = document.createElement("th");
  let confirmNom = document.createElement("th");
  let confirmPrixUnitaire = document.createElement("th");
  let ligneConfirmTotal = document.createElement("tr");
  let colonneConfirmTotal = document.createElement("th");
  let confirmPrixPaye = document.createElement("td");

  //Placement de la structure dans la page
  let confirmPanier = document.getElementById("confirmation-recap");
  confirmPanier.appendChild(recapConfirm);
  recapConfirm.appendChild(ligneConfirm);
  ligneConfirm.appendChild(confirmPhoto);
  ligneConfirm.appendChild(confirmNom);
  ligneConfirm.appendChild(confirmPrixUnitaire);

  //contenu des entetes
  confirmPhoto.textContent = "Article";
  confirmNom.textContent = "Nom";
  confirmPrixUnitaire.textContent = "Prix";

  //Incrémentation de l'id des lignes pour chaque produit
  let i = 0;
  let order = JSON.parse(sessionStorage.getItem("order"));

  order.products.forEach((orderArticle) => {
    //Création de la ligne
    let ligneConfirmArticle = document.createElement("tr");
    let photoConfirmArticle = document.createElement("img");
    let nomConfirmArticle = document.createElement("td");
    let prixUnitConfirmArticle = document.createElement("td");

    //Attribution des class pour le css
    ligneConfirmArticle.setAttribute("id", "article_acheté" + i);
    photoConfirmArticle.setAttribute("class", "photo_article_acheté");
    photoConfirmArticle.setAttribute("src", orderArticle.imageUrl);
    photoConfirmArticle.setAttribute("alt", "Photo de l'article acheté");

    //Insertion dans le HTML
    recapConfirm.appendChild(ligneConfirmArticle);
    ligneConfirmArticle.appendChild(photoConfirmArticle);
    ligneConfirmArticle.appendChild(nomConfirmArticle);
    ligneConfirmArticle.appendChild(prixUnitConfirmArticle);

    //Contenu des lignes

    nomConfirmArticle.textContent = orderArticle.name;
    prixUnitConfirmArticle.textContent = orderArticle.price / 100 + " €";
  });

  //Dernière ligne du tableau : Total
  recapConfirm.appendChild(ligneConfirmTotal);
  ligneConfirmTotal.appendChild(colonneConfirmTotal);
  ligneConfirmTotal.setAttribute("id", "ligneSomme");
  colonneConfirmTotal.textContent = "Total payé";
  ligneConfirmTotal.appendChild(confirmPrixPaye);

  confirmPrixPaye.setAttribute("id", "sommeConfirmTotal");
  confirmPrixPaye.setAttribute("colspan", "4");
  colonneConfirmTotal.setAttribute("id", "colonneConfirmTotal");
  colonneConfirmTotal.setAttribute("colspan", "2");

  //Calcule de l'addition total
  let sommeConfirmTotal = 0;
  order.products.forEach((orderArticle) => {
    sommeConfirmTotal += orderArticle.price / 100;
  });

  //Affichage du prix total à payer dans l'addition
  console.log(sommeConfirmTotal);
  document.getElementById("sommeConfirmTotal").textContent =
    sommeConfirmTotal + " €";
};

// orderArticle ? 