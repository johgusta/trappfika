/*global describe, it, browser, element, by, expect */

(function () {
    "use strict";

describe('trappfika site', function() {
  browser.get('http://localhost:5000/index.html');
    
  it('should should have a clickable contestants menu item', function() {

    element(by.css("li[id='mi_contestants'] > a")).click();

    var firstTh = element(by.css("div[ng-view] table > thead > tr > th"));

    expect(firstTh.getText()).toEqual('Namn');
  });
    
  it('should should have a clickable rules menu item', function() {

    element(by.css("li[id='mi_rules'] > a")).click();

    var h2 = element(by.css("div[ng-view] h2"));

    expect(h2.getText()).toEqual('Regler');
  });

  it('should should have a clickable previous weeks item', function() {

    element(by.css("li[id='mi_weeks'] > a")).click();

    var h2 = element(by.css("div[ng-view] h2"));

    expect(h2.getText()).toEqual('Tidigare veckor');
  });

});

// End of use strict
}());