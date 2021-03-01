//Récupération des informations pour affichage sur la page de confirmation
retourOrder = () => {
    if (sessionStorage.getItem("order") != null) {
      let order = JSON.parse(sessionStorage.getItem("order"));
      let sommeTotal = JSON.parse(sessionStorage.getItem("sommeTotal"));
      document.getElementById("firstName").innerHTML = order.contact.firstName;
      document.getElementById("orderId").innerHTML = order.orderId;
      document.getElementById("sommeConfirmTotal").textContent = sommeTotal + "€";
    
      console.log(order);
      console.log(sommeTotal);
      sessionStorage.removeItem("order");
      sessionStorage.removeItem("sommeTotal");
    }
    //Redirection vers l'accueil
    else {
      alert("Merci pour vote commande. A bientôt");
      window.location = "./index.html";
    }
  };
  retourOrder();