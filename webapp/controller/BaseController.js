sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/ui/core/routing/History",
        "../util/formatter",
        "sap/ui/core/Fragment",
    ],
    function (Controller, UIComponent, History, formatter, Fragment) {
        "use strict";

        return Controller.extend("com.ReformNow.controller.BaseController", {
            formatter: formatter,

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },
            getMsgDialog: function (sTitle, sState) {
                //expreymental sync function for rendering message dialogs
                const oDialog = new sap.m.Dialog({
                    title: sTitle,
                    type: "Message",
                    state: sState,
                    content: [],
                    beginButton: new sap.m.Button({
                        type: "Emphasized",
                        text: "OK",
                        press: function () {
                            oDialog.close();
                        },
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    },
                });
                return oDialog;
            },
            fragmentLoad: function (sSuffix, bCompact = false) {
                //function for common loading of fragments
                return Fragment.load({
                    name: "com.ReformNow.fragment." + sSuffix,
                    id: this.getView().getId(),
                    controller: this,
                }).then((oFragment) => {
                    if (bCompact) {
                        oFragment.addStyleClass("sapUiSizeCompact");
                    }
                    this.getView().addDependent(oFragment);
                    return oFragment;
                });
            },
            handleCloseDialog: function (oEvent) {
                //function for common closing of dialogs
                oEvent.getSource().getParent().close();
            },
        });
    }
);
