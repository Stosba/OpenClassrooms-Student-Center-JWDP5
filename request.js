// Requests

// GET

get = (url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else if (this.status >= 400) {
          console.log('API indisponible');
          document.querySelector('#error').style.display = 'block';
        }
      };
      request.open("GET", url);
      request.send();
    });
  };

  // POST

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
        window.location = "./confirmation_de_commande.html";
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