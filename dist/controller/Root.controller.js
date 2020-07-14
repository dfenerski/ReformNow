function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);if(t)r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable});n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};if(t%2){ownKeys(Object(n),true).forEach(function(t){_defineProperty(e,t,n[t])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(e,Object.getOwnPropertyDescriptors(n))}else{ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}}return e}function _defineProperty(e,t,n){if(t in e){Object.defineProperty(e,t,{value:n,enumerable:true,configurable:true,writable:true})}else{e[t]=n}return e}sap.ui.define(["./BaseController"],function(e){"use strict";return e.extend("com.ReformNow.controller.Root",{onInit:function e(){var t=this.getOwnerComponent().getModel("firebase").getObject("/firestore");var n=this.getOwnerComponent().getModel("firebase").getObject("/auth");n.onAuthStateChanged(function(e){if(e){}});this.signInAnonimously(n);var r=this.getOwnerComponent().getModel("local");this.getDemandsCollection(t,r)},getDemandsCollection:function e(t,n){t.collection("demands").where("verified","==",true).orderBy("rating","desc").get().then(function(e){n.setProperty("/demands",e.docs.map(function(e){return _objectSpread({docID:e.id},e.data())}))})},signInAnonimously:function e(t){t.signInAnonymously()["catch"](function(e){var t=e.code;var n=e.message;console.log(t,n)})}})});