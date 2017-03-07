"use strict";

(function (app) {
    var rootComponent = ng.core
        .Component({
            selector: "country-app",
            templateUrl: "app/root.component.html",
            providers:[app.services.CountryService],
            directives: [app.CountryDetailComponent, app.CountryListComponent]
        })
        .Class({
            constructor: [app.services.CountryService, function Hello(countryService) {
                var vm = this;

                vm.defaultCountry = 'India';
                vm.countryService = countryService;

                var resetDataModel = function () {
                    vm.countries = [];
                    vm.countryDetails = {};
                }

                vm.searchCountry = function (countryName) {
                    countryName = countryName || vm.defaultCountry;
                    console.log("Searching for " + countryName);
                    var rx = vm.countryService.getCountryDetails(countryName);

                    rx.subscribe(function (res) {
                        vm.countries = res.json();
                        vm.countryDetails = {};
                    }, function (err) {
                        resetDataModel();
                    });
                };

                vm.loadCountryDetails = function ($event) {
                    console.log($event);
                    vm.countryDetails = $event;
                };

                vm.reset = function (inputEle) {
                    inputEle.value = null;
                    resetDataModel();
                };
            }]
        });

    app.HelloModule = ng.core.NgModule({
        imports: [ng.platformBrowser.BrowserModule, ng.http.HttpModule],
        declarations: [rootComponent, app.CountryDetailComponent, app.CountryListComponent],
        bootstrap: [rootComponent]
    })
    .Class({
        constructor: function constructor() {}
    });

}(window.app || (window.app = {})));
