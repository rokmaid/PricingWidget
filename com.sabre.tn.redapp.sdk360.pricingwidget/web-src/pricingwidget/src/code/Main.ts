import {Module} from 'sabre-ngv-core/modules/Module';
import {DrawerService} from "sabre-ngv-app/app/services/impl/DrawerService";
import {TileWidgetDrawerConfig} from 'sabre-ngv-core/configs/drawer/TileWidgetDrawerConfig';
import {getService} from "./Context";
import {LargeWidgetDrawerConfig} from 'sabre-ngv-core/configs/drawer/LargeWidgetDrawerConfig';
import {PricingTile} from './views/PricingTile';
import {PricingView} from './views/PricingView'; 

export class Main extends Module {
    init(): void {

        super.init();


        
        const drawerConfig = new LargeWidgetDrawerConfig(PricingTile, PricingView, {
            title: 'Add Advance Passenger Information'


        });

        /*
           This will add our configuration to the pricing response       
        */

       getService(DrawerService).addConfig(['post-pricing-response-widget'], drawerConfig);


    }
}
