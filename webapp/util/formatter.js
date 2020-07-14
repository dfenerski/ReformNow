sap.ui.define([], function () {
    "use strict";

    return {
        dateFormatter1: function (sVal) {
            const dVal = new Date(sVal),
                iDate = dVal.getDate(),
                iMonth = dVal.getMonth() + 1;
            return (
                "" +
                (iDate < 10 ? "0" + iDate : iDate) +
                "." +
                (iMonth < 10 ? "0" + iMonth : iMonth) +
                "." +
                dVal.getFullYear()
            );
        },
        extractJSONDate: function (sDate) {
            var dDate = new Date(sDate);
            var iMonth = dDate.getMonth() + 1;
            var iDate = dDate.getDate();
            return "" + (iDate < 10 ? ("0" + iDate) : iDate) + "." + (iMonth < 10 ? ("0" + iMonth) : iMonth) + "." +
                dDate.getFullYear();
        }
    };
});
