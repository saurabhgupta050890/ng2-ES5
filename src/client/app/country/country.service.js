(function (app) {
    app.services = app.services || {};
    app.services.CountryService = ng.core
        .Class({
            constructor: [ng.http.Http, function (httpService) {
                var url = "https://restcountries.eu/rest/v2/name/"
                this.getCountryDetails = function (country) {
                    return httpService.get(url + country).share();
                }
            }]
    });
})(window.app || (window.app = {}));