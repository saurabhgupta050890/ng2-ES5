"use strict";

(function (app) {
    const component = ng.core
        .Component({
            selector: "country-app",
            templateUrl: "app/app.component.html",
            providers:[app.services.CountryService]
        })
        .Class({
            constructor: [app.services.CountryService, function Hello(countryService) {
                const vm = this;

                vm.defaultCountry = 'India';
                vm.countryService = countryService;

                activate();

                function activate() {
                    const rx = countryService.getCountryDetails(vm.defaultCountry);

                    rx.subscribe(res => {
                        const greetings = res.json();
                        console.log(greetings);

                        vm.greetingFromJSON = greetings;
                    });
                }

            }],
            searchCountry(countryName) {
                console.log("Searching for " + countryName);
                
            }
        });

    app.HelloModule = ng.core.NgModule({
        imports: [ng.platformBrowser.BrowserModule, ng.http.HttpModule, ng.forms.FormsModule],
        declarations: [component],
        bootstrap: [component]
    })
    .Class({
        constructor: function constructor() {}
    });

}(window.app || (window.app = {})));
