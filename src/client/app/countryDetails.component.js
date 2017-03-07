(function (app) {
    app.CountryDetailComponent = ng.core
        .Component({
          selector: 'country-details',
          template: `<div class="lightbox-1">
                <img src={{country.flag}}>
            </div>`,
          inputs: [
              'country'
          ]
        })
        .Class({
            constructor: [function () {
                console.log("Country Details Component Loaded ... ");
            }]
        })
})(window.app || (window.app = {}));