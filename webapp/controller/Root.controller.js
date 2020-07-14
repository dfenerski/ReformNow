sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.ReformNow.controller.Root", {
		onInit: function () {
			const oDB = this.getOwnerComponent().getModel("firebase").getObject("/firestore");
			const oAuth = this.getOwnerComponent().getModel("firebase").getObject("/auth");
			oAuth.onAuthStateChanged(oUser => {
				if (oUser) {
					// console.log(oUser.uid);
				}
			});
			this.signInAnonimously(oAuth);
			const oLocal = this.getOwnerComponent().getModel("local");
			this.getDemandsCollection(oDB, oLocal);
		},
		getDemandsCollection: function (oDB, oLocal) {
			oDB.collection("demands").where('verified', '==', true).orderBy('rating', 'desc').get().then((oSnapshot) => {
				oLocal.setProperty("/demands", oSnapshot.docs.map((doc) => {
					return {
						"docID": doc.id,
						...doc.data()
					}
				}));
			});
		},
		signInAnonimously: function (oAuth) {
			oAuth.signInAnonymously().catch(function (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
		}
	});
});