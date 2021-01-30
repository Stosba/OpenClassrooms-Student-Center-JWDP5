get = (url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status >= 200 && this.status < 400) {
          resolve(JSON.parse(this.responseText));
          console.log("Connecté");
        } else {
          console.log('API indisponible');
          document.querySelector('#error').style.display = 'block';
        }
      };
      request.open("GET", url);
      request.send();
    });
  };