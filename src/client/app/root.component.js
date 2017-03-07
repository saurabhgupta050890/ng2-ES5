"use strict";

(function (app) {
    const rootComponent = ng.core
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

                vm.searchCountry = function (countryName) {
                    countryName = countryName || vm.defaultCountry;
                    console.log("Searching for " + countryName);
                    const rx = vm.countryService.getCountryDetails(countryName);

                    rx.subscribe(function (res) {
                        vm.countries = res.json();
                    });
                };

                vm.loadCountryDetails = function ($event) {
                    console.log($event);
                    vm.countryDetails = $event;
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
