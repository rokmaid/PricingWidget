this.app=this.app||{},this.app.templates=this.app.templates||{},this.app.templates["pricingwidget:PricingView"]=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(container,depth0,helpers,partials,data){var stack1,helper,alias1=null!=depth0?depth0:{},alias2=helpers.helperMissing,alias3="function";return'<!-- Provide templates in this directory -->\r\n<div class="com_sabre_tn_redapp_sdk360_pricingwidget" >\r\n\r\n<form >\r\n  <div class="form-group">\r\n      <label for="segments">Segment Number :</label>\r\n      <select class="form-control" id="segments" > '+(null!=(helper=null!=(helper=helpers.segmentcomobo||(null!=depth0?depth0.segmentcomobo:depth0))?helper:alias2,stack1=typeof helper===alias3?helper.call(alias1,{name:"segmentcomobo",hash:{},data:data}):helper)?stack1:"")+'      </select>\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="documenttype">Document Type  :</label>\r\n      <select class="form-control" id="documenttype">\r\n     <option value="A" > Alien resident card </option>      \r\n     <option value="c" > Permanent resident card </option>   \r\n     <option value="D" > Taiwan travel permit for Chinese mainland residents </option>   \r\n     <option value="DB" > Secure Flight Passenger Data </option>   \r\n     <option value="I" > National ID </option>  \r\n     <option value="P" selected > Passport </option>\r\n     <option value="PD" > Diplomatic Passport </option>\r\n     <option value="PM" > Mission/Service Passport </option>\r\n     <option value="PS" > Special Passport </option>\r\n     <option value="T" > Refugee travel document and re-entry permit, US Travel document </option>\r\n     <option value="F" > Facilitation document </option>\r\n     <option value="M" > Military </option>\r\n     <option value="N" > Naturalization certificate </option>\r\n     <option value="V" > Border crossing card </option>\r\n    </select> \r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="countryissue"> Country of Issue  :</label>\r\n      <input type="text" class="form-control" id="countryissue" maxlength="2" pattern="[A-Z]{2}">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="documentnumber">Document Number  :</label>\r\n      <input type="text" class="form-control" id="documentnumber">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="countrynacionality"> Document nationality country:</label>\r\n      <input type="text" class="form-control" id="countrynacionality" maxlength="2" pattern="[A-Z]{2}">\r\n\r\n  </div>\r\n\r\n\r\n  <div class="form-group">\r\n      <label for="dateofbirth"> Date Of Birth:</label>\r\n      <input type="text" class="form-control" id="dateofbirth" placeholder="15AUG1947">\r\n\r\n  </div>\r\n\r\n\r\n  <div class="form-group">\r\n      <label for="gender"> Gender :</label>\r\n      <select id="gender" class="form-control"> <option value="M"> M </option> <option value="F"> F </option>  </select>\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="documentexpdate"> Document expiration date :</label>\r\n      <input type="text" class="form-control" id="documentexpdate" placeholder="30SEP2011">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="lastname"> Last Name :</label>\r\n      <input type="text" class="form-control" id="lastname">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="firstname"> First Name :</label>\r\n      <input type="text" class="form-control" id="firstname">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="middlename"> Middle Name :</label>\r\n      <input type="text" class="form-control" id="middlename">\r\n\r\n  </div>\r\n\r\n  <div class="form-group">\r\n      <label for="passenger"> Passenger :</label>\r\n      <select class="form-control" id="passenger"> '+(null!=(helper=null!=(helper=helpers.paxcombo||(null!=depth0?depth0.paxcombo:depth0))?helper:alias2,stack1=typeof helper===alias3?helper.call(alias1,{name:"paxcombo",hash:{},data:data}):helper)?stack1:"")+'</select>\r\n\r\n  </div>\r\n\r\n  <button type="button" class="btn btn-default btn-block" id="adddocsbtn" style=\'color:#23826F\'> Add DOCS </button>\r\n\r\n</form>\r\n\r\n</div>\r\n\r\n\r\n\r\n'},useData:!0});