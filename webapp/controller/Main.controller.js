sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("com.ReformNow.controller.Main", {

        onInit: function () {
            this.viewData = {};
            this.byId("demandList").setNoDataText("зареждаме данните . . .");
        },
        onHandleVote: function (oEvent, sDirection) {
            const oBtn = oEvent.getSource();
            const oLocal = this.getModel("local");
            const oDB = this.getModel("firebase").getObject("/firestore");
            const sPath = oBtn.getParent().getBindingContext("local").getPath();
            const oData = oLocal.getProperty(sPath);
            const sUID = this.getModel("firebase").getObject("/auth").currentUser.uid;
            oData.rating = sDirection === "up" ? oData.rating + 1 : oData.rating - 1;
            oData.voters = [...oData.voters, sUID];
            oDB.collection("demands").doc(oData.docID).update({
                rating: oData.rating,
                voters: oData.voters
            });
            oLocal.setProperty(sPath, oData);
            try {
                oBtn.getParent().getContent()[3].setVisible(false);
                oBtn.getParent().getContent()[4].setVisible(false);
            } catch (e) {
                console.log(e);
            }
            sap.m.MessageToast.show("Благодарим Ви за гласуването!")
        },
        handleOpenAddDialog: function () {
            if (!this.viewData.AddDialog) {
                this.fragmentLoad("AddDialog").then((oFragment) => {
                    this.viewData.AddDialog = oFragment;
                    this.byId("dateField").setDateValue(new Date());
                    this.viewData.AddDialog.open();
                });
            } else {
                this.viewData.AddDialog.open();
            }
        },
        handleAddGoal: function (oEvent) {
            const oTitleField = this.byId("titleField"), oDescrField = this.byId("descrField"), oTimeField = this.byId("dateField");
            const oRequest = {
                title: oTitleField.getValue(),
                description: oDescrField.getValue(),
                rating: 1,
                timestamp: new Date(oTimeField.getDateValue()).toJSON(),
                voters: [this.getModel("firebase").getObject("/auth").currentUser.uid],
                verified: false,
                submitedBy: this.getModel("firebase").getObject("/auth").currentUser.uid
            };
            this.getModel("firebase").getObject("/firestore").collection("demands").add(oRequest).then(oRes => {
                sap.m.MessageToast.show("Благодарим Ви!");
            });
            oTitleField.setValue("");
            oDescrField.setValue("");
            this.handleCloseDialog(oEvent);
        }
    });
});