import {AbstractView} from "sabre-ngv-app/app/AbstractView";
import {Template} from 'sabre-ngv-core/decorators/classes/view/Template';
import {SrwAsyncApi} from "sabre-ngv-app/app/services/impl/SrwAsyncApi";
import {SrwSyncApi} from "sabre-ngv-app/app/services/impl/SrwSyncApi";
import {getService} from "../Context";
import {cf} from '../Context';

@Template('pricingwidget:PricingView')
export class  PricingView extends AbstractView {



    payload :string ="<TravelItineraryReadRQ xmlns='http://services.sabre.com/res/tir/v3_10' xmlns:xs='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:dd='http://webservices.sabre.com/dd2' Version='3.10.0' TimeStamp='2012-09-19T10:00:00-06:00'>"+
    "<MessagingDetails>"+
    "<SubjectAreas>"+
    "<SubjectArea>FULL</SubjectArea>"+
    "</SubjectAreas>"+ 
    "</MessagingDetails>"+
    "</TravelItineraryReadRQ>" ; 
     actioncode :string ='TravelItineraryReadRQ' ;

     srwApi:SrwAsyncApi=getService(SrwAsyncApi) ;
     srwSyncpi :SrwSyncApi =getService(SrwSyncApi); 

     currentPNR :Document ; 


    constructor(){
        super();

 

        // set on click function for the add DOCS button 

        this.addDomEvent('click #adddocsbtn',this.addDocs.bind(this));

          // call TIR to get segments and passangers 
       // this.getPNR();

       this.getPNR();

      
    }



    getPNR(){

 this.srwApi.sws(this.payload,this.actioncode,(resp:string)=>{

            let jsonresponse = JSON.parse(resp);

            let parser :DOMParser = new DOMParser();

            console.log(jsonresponse.response.payload.responseText); 

           let doc =parser.parseFromString(jsonresponse.response.payload.responseText,"application/xml"); 
             
           this.currentPNR = doc ;

     

       // let resitems = doc.getElementsByTagName('tir310:ReservationItems'); 
         this.appendSegments(doc)
        
            
         this.appendPassengers(doc);

          })



    }

    appendSegments(doc :Document){

        // console.log(segments); 

        let resitems:Element = doc.getElementsByTagName('tir310:ReservationItems')[0]; 
        //let items = resitems.getElementsByTagName('tir310:Item'); 
          
        console.log(resitems);

        let segmentscombo=  this.$el.find('#segments'); 
        let combooptions:string = "" ;

        for(let i = 0 ; i <resitems.children.length;i++){

         //   let segment :Element = segments[i]; 
         let item:Element =resitems.children[i]; 

         console.log(item);
    
        let rph:string = item.getAttribute('RPH'); 

                // append to the segments drop down box 
             console.log(rph) ; 

           combooptions+="<option value="+rph+">"+rph+"</option>"

        }

        /*
        Render the view again when we update the GUI 
        */
this.getModel().set('segmentcomobo',combooptions); 

this.render();
    }

    appendPassengers(doc:Document){
 
    let paxs =  doc.getElementsByTagName('tir310:PersonName'); 

        console.log(paxs); 
        let combooptions:string = "" ;

        let passengerscombo=  this.$el.find('#passenger'); 

        for(let i = 0 ; i <paxs.length;i++){

          let pax :Element=paxs[i]; 

          let namenumber:string = pax.getAttribute('NameNumber'); 

          let lastname:Element = pax.getElementsByTagName('tir310:Surname')[0];
         
          let firsname :Element = pax.getElementsByTagName('tir310:GivenName')[0];

          let paxstring :string = namenumber+" "+lastname.textContent+ "/"+firsname.textContent ; 


       combooptions+="<option value="+paxstring+">"+paxstring+"</option>"

          console.log(namenumber+" "+lastname.textContent+ "/"+firsname.textContent ); 

        }

        this.getModel().set('paxcombo',combooptions); 
        this.render()

    }

    addDocs(){
       let segmentvalue:string  =  this.$el.find('#segments').val(); 
       console.log(segmentvalue); 

       let documenttype:string =  this.$el.find('#documenttype').val(); 
       console.log(documenttype) ; 

       let countryofissue:string  =  this.$el.find('#countryissue').val(); 
       console.log(countryofissue); 

       let documentnumber:string =  this.$el.find('#documentnumber').val(); 
       console.log(documentnumber); 
       
       let countrynacionality:string=  this.$el.find('#countrynacionality').val(); 
       console.log(countrynacionality) ; 

       let dateofbirth:string =  this.$el.find('#dateofbirth').val(); 
       console.log(dateofbirth); 

       let gender =  this.$el.find('#gender').val(); 
       console.log(gender) ; 

       let documentexpdate:string =  this.$el.find('#documentexpdate').val(); 
       console.log(documentexpdate) ; 

       let lastname:string =  this.$el.find('#lastname').val(); 
       console.log(lastname) ; 

       let firstname:string =  this.$el.find('#firstname').val(); 
       console.log(firstname) ; 

       let passenger =  this.$el.find('#passenger').val(); 
       console.log(passenger) ; 


       let middlename:string ; 

       if(this.$el.find('#middlename').val()==""){
        middlename="";
       }else {
          
           middlename = "/"+this.$el.find('#middlename').val(); 
       }

       // need conditional logic to determine if the command starts with 3 or 4 based on the carrier of the segment selected 
       let command :string = "3DOCS"+segmentvalue+"/"+documenttype+"/"+countryofissue.toUpperCase()+"/"+documentnumber+"/"
       +countrynacionality.toUpperCase()+"/"+dateofbirth.toUpperCase()+"/"+gender+"/"+documentexpdate.toUpperCase()+"/"+lastname.toUpperCase()+"/"+firstname.toUpperCase()
       +middlename.toUpperCase()+"-"+passenger; 

      // this.srwApi.executeInEmu(command,true,true,{} ); 

      /*
      Send our command to the host and close the dialog 
      */

      if(this.validateFields()){
        console.log(command);
           //   cf(command).send(); 

             this.srwSyncpi.executeInEmu(command,true,true); 
             super.triggerOnEventBus('close-modal');
      }



    console.log(this.getCarrier(segmentvalue)); 
    }


 validateFields():boolean {
     let validatedcorrectly:boolean = true ; 

     let countryofissue:string  =  this.$el.find('#countryissue').val(); 
     let countrynacionality:string=  this.$el.find('#countrynacionality').val(); 
     let dateofbirth:string =  this.$el.find('#dateofbirth').val();
     let documentexpdate:string =  this.$el.find('#documentexpdate').val();

     if( ! countryofissue.toUpperCase().match('[A-Z]{2}' )){
        validatedcorrectly = false ; 
        // this.$el.find('#countryissue').css({ "border": "2px solid red "  }) ; 
        this.$el.find('#countryissue').addClass("com_sabre_tn_redapp_sdk360_pricingwidget.pricingwidget_error"); 

       //this.$el.find('#countryissue').addClass("error"); 

     }else {
      //   this.$el.find('#countryissue').css({ "border":  "ridge"  })
       this.$el.find('#countryissue').removeClass("com_sabre_tn_redapp_sdk360_pricingwidget.pricingwidget_error");
     }
    
     if (! countrynacionality.toUpperCase().match('[A-Z]{2}') ){

        validatedcorrectly = false ; 
        this.$el.find('#countrynacionality').css({ "border": "2px solid red "  }); 

     }else {

        this.$el.find('#countrynacionality').css({ "border": "ridge "  });
     }

     if(! dateofbirth.toUpperCase().match('[0-9]{2}[A-Z]{3}[0-9]{4}')){
        validatedcorrectly = false ; 
        this.$el.find('#dateofbirth').css({ "border": "2px solid red "  }); 
     }else {

        this.$el.find('#dateofbirth').css({ "border": "ridge "  });
     }

     if(! documentexpdate.toUpperCase().match('[0-9]{2}[A-Z]{3}[0-9]{4}')){
        validatedcorrectly = false ; 
        this.$el.find('#documentexpdate').css({ "border": "2px solid red "  });

     }else {

        this.$el.find('#documentexpdate').css({ "border": "ridge "  }); 
     }

    return validatedcorrectly  ; 
 }


 getCarrier(segmentNumber:string ):string {

let resitems :Element =   this.currentPNR.getElementsByTagName('tir310:ReservationItems')[0]; 

for(let i = 0 ; i <resitems.children.length;i++){

    let item:Element =resitems.children[i]; 
    
    if(item.getAttribute('RPH')==segmentNumber){

            let Flight:Element = item.getElementsByTagName('tir310:FlightSegment')[0]; 

            return Flight.getElementsByTagName('tir310:MarketingAirline')[0].getAttribute('Code');

    }


}


    return '' ; 
 }


}