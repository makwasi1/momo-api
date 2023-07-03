// serviceWorker/background.js
try {
    // you need to manually have firebase-compat.js file in your dir
  self.importScripts('../firebase/firebase-compat.js');

  var config = {
    apiKey: "AIzaSyAYvSgHKFVA9pUV_ILarCPkO_uUx33Hktg",
    authDomain: "momocard-e107f.firebaseapp.com",
    databaseURL: "https://momocard-e107f-default-rtdb.firebaseio.com",
    projectId: "momocard-e107f",
    storageBucket: "momocard-e107f.appspot.com",
    messagingSenderId: "619740870481",
    appId: "1:619740870481:web:f43898f639b456b7900570"
  };
  firebase.initializeApp(config);

  var db = firebase.firestore();

  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.command === "post") {
            // in here, you can use both firebase and data from popup view
      console.log(request.data);
            return true;
    }
  });
} catch (e) {
  console.error(e);
}