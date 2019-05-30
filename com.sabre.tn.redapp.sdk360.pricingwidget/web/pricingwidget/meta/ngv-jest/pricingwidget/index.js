var reflex = require('ngv-jest-platform');
var _0 = require("..\\..\\..\\..\\sabre-ngv-app\\module.js");
var _1 = require("..\\..\\..\\..\\sabre-ngv-core\\module.js");
var _2 = require("..\\..\\..\\module.js");

var module = reflex.require("pricingwidget/index");
reflex.initModule({"name":"pricingwidget","version":"4.8.7","meta":{},"dependencies":["sabre-ngv-app","sabre-ngv-core"],"submodules":["pricingwidget/Context","pricingwidget/index","pricingwidget/Main","pricingwidget/views/PricingTile","pricingwidget/views/PricingView"],"hasTemplates":true,"hasStyles":true});

for( var i in module ) {
    if( module.hasOwnProperty(i) ) {
        exports[i] = module[i];
    }
}
