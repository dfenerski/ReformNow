sap.ui.define(["sap/ui/test/Opa5"], function (Opa5) {
  "use strict";

  var sViewName = "Root";
  Opa5.createPageObjects({
    onTheAppPage: {
      actions: {},
      assertions: {
        iShouldSeeTheApp: function iShouldSeeTheApp() {
          return this.waitFor({
            id: "app",
            viewName: sViewName,
            success: function success() {
              Opa5.assert.ok(true, "The Root view is displayed");
            },
            errorMessage: "Did not find the Root view"
          });
        }
      }
    }
  });
});