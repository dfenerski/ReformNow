sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  var oFirebaseConfig = {
    apiKey: "AIzaSyB4IEmsIuoPXmvh5FUtjj0MRl-HLRiS6tM",
    authDomain: "az-iskam.firebaseapp.com",
    databaseURL: "https://az-iskam.firebaseio.com",
    projectId: "az-iskam",
    storageBucket: "az-iskam.appspot.com",
    messagingSenderId: "191718209339",
    appId: "1:191718209339:web:fbdd6b53229d9be65b291e"
  };
  return {
    initializeFirebase: function initializeFirebase() {
      firebase.initializeApp(oFirebaseConfig);
      var firestore = firebase.firestore();
      var auth = firebase.auth();
      var oFirebase = {
        firestore: firestore,
        auth: auth
      };
      var firebaseModel = new JSONModel(oFirebase);
      return firebaseModel;
    }
  };
});