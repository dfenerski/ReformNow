sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent", "sap/ui/core/routing/History", "../util/formatter", "sap/ui/core/Fragment"], function (Controller, UIComponent, History, formatter, Fragment) {
  "use strict";

  return Controller.extend("com.ReformNow.controller.BaseController", {
    formatter: formatter,
    getRouter: function getRouter() {
      return UIComponent.getRouterFor(this);
    },
    getModel: function getModel(sName) {
      return this.getView().getModel(sName);
    },
    setModel: function setModel(oModel, sName) {
      return this.getView().setModel(oModel, sName);
    },
    getResourceBundle: function getResourceBundle() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
    getMsgDialog: function getMsgDialog(sTitle, sState) {
      //expreymental sync function for rendering message dialogs
      var oDialog = new sap.m.Dialog({
        title: sTitle,
        type: "Message",
        state: sState,
        content: [],
        beginButton: new sap.m.Button({
          type: "Emphasized",
          text: "OK",
          press: function press() {
            oDialog.close();
          }
        }),
        afterClose: function afterClose() {
          oDialog.destroy();
        }
      });
      return oDialog;
    },
    fragmentLoad: function fragmentLoad(sSuffix) {
      var _this = this;

      var bCompact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //function for common loading of fragments
      return Fragment.load({
        name: "com.ReformNow.fragment." + sSuffix,
        id: this.getView().getId(),
        controller: this
      }).then(function (oFragment) {
        if (bCompact) {
          oFragment.addStyleClass("sapUiSizeCompact");
        }

        _this.getView().addDependent(oFragment);

        return oFragment;
      });
    },
    handleCloseDialog: function handleCloseDialog(oEvent) {
      //function for common closing of dialogs
      oEvent.getSource().getParent().close();
    }
  });
});