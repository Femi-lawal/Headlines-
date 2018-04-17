
// creating the IndexedDb database
var OpenIDB = () => {
  return idb.open('headlines-db', 1, function(upgradeDb) {
  var store = upgradeDb.createObjectStore('headlines-db', {
      keyPath: 'id'
  });
  store.createIndex('by-date', 'time')
    });
}


  // Registering ServiceWorker
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  })};



function openDb() {
    if (window.indexedDB) {
        var request = indexedDB.open("headlines-db", 1);

        request.onerror = function(e) {
            console.log(e);
        }

        return request;
    };
}


function search() {
    var input, filter, container, option;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    container = document.querySelector("#container");
    for (i = 0; i < container.length; i++) {
        option = container[i].getElementsByTagName("option")[0];
        if (option.innerHTML.toUpperCase().indexOf(filter) > -1) {
            container[i].style.display = "";
        } else {
            container[i].style.display = "none";

        }
    }
}