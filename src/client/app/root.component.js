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
                const vm = this;

                vm.defaultCountry = 'India';
                vm.countryService = countryService;

            }],
            searchCountry (countryName) {
                countryName = countryName || this.defaultCountry;
                console.log("Searching for " + countryName);
                const rx = this.countryService.getCountryDetails(countryName);

                rx.subscribe( res => {
                    this.countries = res.json();
                    //console.log(this.countries);
                });
            },
            loadCountryDetails ($event) {
                console.log($event);
                this.countryDetails = $event;
            }
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
