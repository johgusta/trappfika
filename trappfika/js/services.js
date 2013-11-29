/*global $, angular */
(function () {
    "use strict";

    angular.module('trappfika.services', [])
        .factory("date", function() {
            return {
                getWeek: function() {
                    return $.datepicker.iso8601Week(new Date());
                }
            };
        });

// End of use strict
}());
