function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("com.ReformNow.controller.Root", {
    onInit: function onInit() {
      var oDB = this.getOwnerComponent().getModel("firebase").getObject("/firestore");
      var oAuth = this.getOwnerComponent().getModel("firebase").getObject("/auth");
      oAuth.onAuthStateChanged(function (oUser) {
        if (oUser) {// console.log(oUser.uid);
        }
      });
      this.signInAnonimously(oAuth);
      var oLocal = this.getOwnerComponent().getModel("local");
      this.getDemandsCollection(oDB, oLocal);
    },
    getDemandsCollection: function getDemandsCollection(oDB, oLocal) {
      oDB.collection("demands").where('verified', '==', true).orderBy('rating', 'desc').get().then(function (oSnapshot) {
        oLocal.setProperty("/demands", oSnapshot.docs.map(function (doc) {
          return _objectSpread({
            "docID": doc.id
          }, doc.data());
        }));
      });
    },
    signInAnonimously: function signInAnonimously(oAuth) {
      oAuth.signInAnonymously()["catch"](function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
  });
});