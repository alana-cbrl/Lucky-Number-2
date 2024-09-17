sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Text"
], function (Controller, JSONModel, Text) {
    "use strict";

    return Controller.extend("com.myorg.myapp.controller.Main", {
        onInit: function () {
            var oModel = new JSONModel({
                numbers: []
            });
            this.getView().setModel(oModel);
            this.onGenerateNumber();
        },
        
        onGenerateNumber: function () {
            
            var number = Math.floor(Math.random() * 100) + 1;
            
            this.getView().byId("luckNumber").setText(number.toString());
            
            var oModel = this.getView().getModel();
            var aNumbers = oModel.getProperty("/numbers");
            aNumbers.unshift(number);
            oModel.setProperty("/numbers", aNumbers);
            
            this.updateNumbers();
        },
    
        updateNumbers: function () {
            var oHBox = this.getView().byId("sortedNumbers");
            oHBox.removeAllItems();
            var aNumbers = this.getView().getModel().getProperty("/numbers");
            aNumbers.forEach(function(num) {
                var oText = new Text({
                    text: num.toString(),
                    width: "4rem",
                    textAlign: "Center"
                }).addStyleClass("numberBox");
                oHBox.addItem(oText);
            });
        }
    });
});