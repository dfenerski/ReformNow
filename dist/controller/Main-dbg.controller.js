function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("com.ReformNow.controller.Main", {
    onInit: function onInit() {
      this.viewData = {};
      this.byId("demandList").setNoDataText("зареждаме данните . . .");
    },
    onHandleVote: function onHandleVote(oEvent, sDirection) {
      var oBtn = oEvent.getSource();
      var oLocal = this.getModel("local");
      var oDB = this.getModel("firebase").getObject("/firestore");
      var sPath = oBtn.getParent().getBindingContext("local").getPath();
      var oData = oLocal.getProperty(sPath);
      var sUID = this.getModel("firebase").getObject("/auth").currentUser.uid;
      oData.rating = sDirection === "up" ? oData.rating + 1 : oData.rating - 1;
      oData.voters = [].concat(_toConsumableArray(oData.voters), [sUID]);
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

      sap.m.MessageToast.show("Благодарим Ви за гласуването!");
    },
    handleOpenAddDialog: function handleOpenAddDialog() {
      var _this = this;

      if (!this.viewData.AddDialog) {
        this.fragmentLoad("AddDialog").then(function (oFragment) {
          _this.viewData.AddDialog = oFragment;

          _this.byId("dateField").setDateValue(new Date());

          _this.viewData.AddDialog.open();
        });
      } else {
        this.viewData.AddDialog.open();
      }
    },
    handleAddGoal: function handleAddGoal(oEvent) {
      var oTitleField = this.byId("titleField"),
          oDescrField = this.byId("descrField"),
          oTimeField = this.byId("dateField");
      var oRequest = {
        title: oTitleField.getValue(),
        description: oDescrField.getValue(),
        rating: 1,
        timestamp: new Date(oTimeField.getDateValue()).toJSON(),
        voters: [this.getModel("firebase").getObject("/auth").currentUser.uid],
        verified: false,
        submitedBy: this.getModel("firebase").getObject("/auth").currentUser.uid
      };
      this.getModel("firebase").getObject("/firestore").collection("demands").add(oRequest).then(function (oRes) {
        sap.m.MessageToast.show("Благодарим Ви!");
      });
      oTitleField.setValue("");
      oDescrField.setValue("");
      this.handleCloseDialog(oEvent);
    }
  });
});