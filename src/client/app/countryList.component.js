(function (app) {
    app.CountryListComponent = ng.core
        .Component({
          selector: 'country-list',
          template: `<div>
                <ul>
                    <li *ngFor="let country of countries">
                        <button class="btn--flat color--blue" (click)="loadCountryDetails(country)">  {{country.name}} ({{country.region}}) </button>
                    </li>
                </ul>
            </div>`,
          inputs: [
              'countries'
          ],
          outputs: ['loadDetails']
        })
        .Class({
            constructor: [function () {
                var vm = this;
                var geoCodeUrl = 'http://www.geonames.org/flags/x/';
                console.log("Country List Component Loaded ... ");
                vm.loadDetails = new ng.core.EventEmitter();

                vm.loadCountryDetails = function (country) {
                    console.log(country);
                    vm.loadDetails.emit({
                        name: country.name,
                        continent: country.region,
                        flag: geoCodeUrl + country.alpha2Code.toLowerCase() + '.gif',
                        location: {
                            lat: country.latlng[0],
                            long: country.latlng[1]
                        }
                    });
                };
            }]
        });
})(window.app || (window.app = {}));