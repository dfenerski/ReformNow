sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "com/ReformNow/model/models", "com/ReformNow/util/Firebase"], function (UIComponent, Device, models, Firebase) {
  "use strict";

  return UIComponent.extend("com.ReformNow.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function init() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments); // enable routing

      this.getRouter().initialize(); // set the device model

      this.setModel(models.createDeviceModel(), "device"); // set the firebase model

      this.setModel(Firebase.initializeFirebase(), "firebase"); // set the localstorage model

      this.setModel(new sap.ui.model.json.JSONModel(localStorage), "localStorage");
      jQuery.sap.setIcons({
        favicon: "asset/favicon.ico"
      });
    }
  });
});