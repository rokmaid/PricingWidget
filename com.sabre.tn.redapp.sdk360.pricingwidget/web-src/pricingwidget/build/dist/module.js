var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<amd-module name="pricingwidget/Context" />
/// <ngv scope="public" />
define("pricingwidget/Context", ["require", "exports", "sabre-ngv-core/modules/ModuleContext"], function (require, exports, ModuleContext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // Cannot use IModuleContext['something'] for types - it seems to break generics
    // types are copied from IModuleContext
    /** @internal **/
    exports.context = new ModuleContext_1.ModuleContext("pricingwidget");
    /** @internal **/
    exports.cf = exports.context.cf.bind(exports.context);
    /** @internal **/
    exports.registerService = exports.context.registerService.bind(exports.context);
    /** @internal **/
    exports.getService = exports.context.getService.bind(exports.context);
});
define("pricingwidget/views/PricingTile", ["require", "exports", "sabre-ngv-app/app/widgets/drawer/views/elements/Tile", "sabre-ngv-core/decorators/classes/Initial", "sabre-ngv-app/app/common/mixins/WithoutFocusOnClick", "sabre-ngv-core/decorators/classes/Mixin"], function (require, exports, Tile_1, Initial_1, WithoutFocusOnClick_1, Mixin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PricingTile = (function (_super) {
        __extends(PricingTile, _super);
        function PricingTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PricingTile.prototype.selfDrawerContextModelPropagated = function () {
            this.setDataContent('Add Visa Information ');
        };
        return PricingTile;
    }(Tile_1.Tile));
    PricingTile = __decorate([
        Initial_1.Initial({
            caption: 'Add Advance Passenger Information',
        }),
        Mixin_1.Mixin(WithoutFocusOnClick_1.WithoutFocusOnClick)
    ], PricingTile);
    exports.PricingTile = PricingTile;
});
define("pricingwidget/views/PricingView", ["require", "exports", "sabre-ngv-app/app/AbstractView", "sabre-ngv-core/decorators/classes/view/Template", "sabre-ngv-app/app/services/impl/SrwAsyncApi", "sabre-ngv-app/app/services/impl/SrwSyncApi", "pricingwidget/Context"], function (require, exports, AbstractView_1, Template_1, SrwAsyncApi_1, SrwSyncApi_1, Context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PricingView = (function (_super) {
        __extends(PricingView, _super);
        function PricingView() {
            var _this = _super.call(this) || this;
            _this.payload = "<TravelItineraryReadRQ xmlns='http://services.sabre.com/res/tir/v3_10' xmlns:xs='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:dd='http://webservices.sabre.com/dd2' Version='3.10.0' TimeStamp='2012-09-19T10:00:00-06:00'>" +
                "<MessagingDetails>" +
                "<SubjectAreas>" +
                "<SubjectArea>FULL</SubjectArea>" +
                "</SubjectAreas>" +
                "</MessagingDetails>" +
                "</TravelItineraryReadRQ>";
            _this.actioncode = 'TravelItineraryReadRQ';
            _this.srwApi = Context_1.getService(SrwAsyncApi_1.SrwAsyncApi);
            _this.srwSyncpi = Context_1.getService(SrwSyncApi_1.SrwSyncApi);
            // set on click function for the add DOCS button 
            _this.addDomEvent('click #adddocsbtn', _this.addDocs.bind(_this));
            // call TIR to get segments and passangers 
            // this.getPNR();
            _this.getPNR();
            return _this;
        }
        PricingView.prototype.getPNR = function () {
            var _this = this;
            this.srwApi.sws(this.payload, this.actioncode, function (resp) {
                var jsonresponse = JSON.parse(resp);
                var parser = new DOMParser();
                console.log(jsonresponse.response.payload.responseText);
                var doc = parser.parseFromString(jsonresponse.response.payload.responseText, "application/xml");
                _this.currentPNR = doc;
                // let resitems = doc.getElementsByTagName('tir310:ReservationItems'); 
                _this.appendSegments(doc);
                _this.appendPassengers(doc);
            });
        };
        PricingView.prototype.appendSegments = function (doc) {
            // console.log(segments); 
            var resitems = doc.getElementsByTagName('tir310:ReservationItems')[0];
            //let items = resitems.getElementsByTagName('tir310:Item'); 
            console.log(resitems);
            var segmentscombo = this.$el.find('#segments');
            var combooptions = "";
            for (var i = 0; i < resitems.children.length; i++) {
                //   let segment :Element = segments[i]; 
                var item = resitems.children[i];
                console.log(item);
                var rph = item.getAttribute('RPH');
                // append to the segments drop down box 
                console.log(rph);
                combooptions += "<option value=" + rph + ">" + rph + "</option>";
            }
            /*
            Render the view again when we update the GUI
            */
            this.getModel().set('segmentcomobo', combooptions);
            this.render();
        };
        PricingView.prototype.appendPassengers = function (doc) {
            var paxs = doc.getElementsByTagName('tir310:PersonName');
            console.log(paxs);
            var combooptions = "";
            var passengerscombo = this.$el.find('#passenger');
            for (var i = 0; i < paxs.length; i++) {
                var pax = paxs[i];
                var namenumber = pax.getAttribute('NameNumber');
                var lastname = pax.getElementsByTagName('tir310:Surname')[0];
                var firsname = pax.getElementsByTagName('tir310:GivenName')[0];
                var paxstring = namenumber + " " + lastname.textContent + "/" + firsname.textContent;
                combooptions += "<option value=" + paxstring + ">" + paxstring + "</option>";
                console.log(namenumber + " " + lastname.textContent + "/" + firsname.textContent);
            }
            this.getModel().set('paxcombo', combooptions);
            this.render();
        };
        PricingView.prototype.addDocs = function () {
            var segmentvalue = this.$el.find('#segments').val();
            console.log(segmentvalue);
            var documenttype = this.$el.find('#documenttype').val();
            console.log(documenttype);
            var countryofissue = this.$el.find('#countryissue').val();
            console.log(countryofissue);
            var documentnumber = this.$el.find('#documentnumber').val();
            console.log(documentnumber);
            var countrynacionality = this.$el.find('#countrynacionality').val();
            console.log(countrynacionality);
            var dateofbirth = this.$el.find('#dateofbirth').val();
            console.log(dateofbirth);
            var gender = this.$el.find('#gender').val();
            console.log(gender);
            var documentexpdate = this.$el.find('#documentexpdate').val();
            console.log(documentexpdate);
            var lastname = this.$el.find('#lastname').val();
            console.log(lastname);
            var firstname = this.$el.find('#firstname').val();
            console.log(firstname);
            var passenger = this.$el.find('#passenger').val();
            console.log(passenger);
            var middlename;
            if (this.$el.find('#middlename').val() == "") {
                middlename = "";
            }
            else {
                middlename = "/" + this.$el.find('#middlename').val();
            }
            // need conditional logic to determine if the command starts with 3 or 4 based on the carrier of the segment selected 
            var command = "3DOCS" + segmentvalue + "/" + documenttype + "/" + countryofissue.toUpperCase() + "/" + documentnumber + "/"
                + countrynacionality.toUpperCase() + "/" + dateofbirth.toUpperCase() + "/" + gender + "/" + documentexpdate.toUpperCase() + "/" + lastname.toUpperCase() + "/" + firstname.toUpperCase()
                + middlename.toUpperCase() + "-" + passenger;
            // this.srwApi.executeInEmu(command,true,true,{} ); 
            /*
            Send our command to the host and close the dialog
            */
            if (this.validateFields()) {
                console.log(command);
                //   cf(command).send(); 
                this.srwSyncpi.executeInEmu(command, true, true);
                _super.prototype.triggerOnEventBus.call(this, 'close-modal');
            }
            console.log(this.getCarrier(segmentvalue));
        };
        PricingView.prototype.validateFields = function () {
            var validatedcorrectly = true;
            var countryofissue = this.$el.find('#countryissue').val();
            var countrynacionality = this.$el.find('#countrynacionality').val();
            var dateofbirth = this.$el.find('#dateofbirth').val();
            var documentexpdate = this.$el.find('#documentexpdate').val();
            if (!countryofissue.toUpperCase().match('[A-Z]{2}')) {
                validatedcorrectly = false;
                this.$el.find('#countryissue').css({ "border": "2px solid red " });
                this.$el.find('#countryissue').addClass("error");
            }
            else {
                this.$el.find('#countryissue').css({ "border": "ridge" });
                this.$el.find('#countryissue').removeClass("error");
            }
            if (!countrynacionality.toUpperCase().match('[A-Z]{2}')) {
                validatedcorrectly = false;
                this.$el.find('#countrynacionality').css({ "border": "2px solid red " });
            }
            else {
                this.$el.find('#countrynacionality').css({ "border": "ridge " });
            }
            if (!dateofbirth.toUpperCase().match('[0-9]{2}[A-Z]{3}[0-9]{4}')) {
                validatedcorrectly = false;
                this.$el.find('#dateofbirth').css({ "border": "2px solid red " });
            }
            else {
                this.$el.find('#dateofbirth').css({ "border": "ridge " });
            }
            if (!documentexpdate.toUpperCase().match('[0-9]{2}[A-Z]{3}[0-9]{4}')) {
                validatedcorrectly = false;
                this.$el.find('#documentexpdate').css({ "border": "2px solid red " });
            }
            else {
                this.$el.find('#documentexpdate').css({ "border": "ridge " });
            }
            return validatedcorrectly;
        };
        PricingView.prototype.getCarrier = function (segmentNumber) {
            var resitems = this.currentPNR.getElementsByTagName('tir310:ReservationItems')[0];
            for (var i = 0; i < resitems.children.length; i++) {
                var item = resitems.children[i];
                if (item.getAttribute('RPH') == segmentNumber) {
                    var Flight = item.getElementsByTagName('tir310:FlightSegment')[0];
                    return Flight.getElementsByTagName('tir310:MarketingAirline')[0].getAttribute('Code');
                }
            }
            return '';
        };
        return PricingView;
    }(AbstractView_1.AbstractView));
    PricingView = __decorate([
        Template_1.Template('pricingwidget:PricingView'),
        __metadata("design:paramtypes", [])
    ], PricingView);
    exports.PricingView = PricingView;
});
define("pricingwidget/Main", ["require", "exports", "sabre-ngv-core/modules/Module", "sabre-ngv-app/app/services/impl/DrawerService", "pricingwidget/Context", "sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig", "pricingwidget/views/PricingTile", "pricingwidget/views/PricingView"], function (require, exports, Module_1, DrawerService_1, Context_2, LargeWidgetDrawerConfig_1, PricingTile_1, PricingView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.init = function () {
            _super.prototype.init.call(this);
            var drawerConfig = new LargeWidgetDrawerConfig_1.LargeWidgetDrawerConfig(PricingTile_1.PricingTile, PricingView_1.PricingView, {
                title: 'Add Advance Passenger Information'
            });
            /*
               This will add our configuration to the pricing response
            */
            Context_2.getService(DrawerService_1.DrawerService).addConfig(['post-pricing-response-widget'], drawerConfig);
        };
        return Main;
    }(Module_1.Module));
    exports.Main = Main;
});
///<amd-module name="pricingwidget" />
define("pricingwidget", ["require", "exports", "pricingwidget/Main", "pricingwidget/Context"], function (require, exports, Main_1, Context_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Module_pricingwidget = (function (_super) {
        __extends(Module_pricingwidget, _super);
        function Module_pricingwidget(manifest) {
            var _this = _super.call(this, manifest) || this;
            Context_3.context.setModule(_this);
            return _this;
        }
        return Module_pricingwidget;
    }(Main_1.Main));
    exports.default = Module_pricingwidget;
});

//# sourceMappingURL=module.js.map
