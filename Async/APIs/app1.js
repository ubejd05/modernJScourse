document.getElementById('button').addEventListener('click', loadData);

function loadData() {
   // Create an XHR object
   const xhr = new XMLHttpRequest();

   // OPEN 
   xhr.open('GET', 'https://api.coindesk.com/v1/bpi/currentprice.json', true);

   xhr.onload = function() { 
      if (this.status == 200) {
         console.log(this.responseText);
         document.getElementById('output').innerHTML = 
         `
         <p>${JSON.stringify(this.responseText)}</p>
         `
      }
   }

   xhr.onerror = function () { 
      console.log('Request Error!', xhr.status);
   }

   xhr.send();
}
