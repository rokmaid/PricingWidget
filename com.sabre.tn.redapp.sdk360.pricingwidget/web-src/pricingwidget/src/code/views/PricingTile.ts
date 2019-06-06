import {Tile} from "sabre-ngv-app/app/widgets/drawer/views/elements/Tile";
import {TileOptions} from "sabre-ngv-app/app/widgets/drawer/views/elements/TileOptions";
import {Initial} from 'sabre-ngv-core/decorators/classes/Initial';
import {FlightSegment} from "sabre-ngv-app/app/common/data/flight/FlightSegment";
import {WithoutFocusOnClick} from "sabre-ngv-app/app/common/mixins/WithoutFocusOnClick";
import {Mixin} from "sabre-ngv-core/decorators/classes/Mixin";
import {AbstractModel} from "sabre-ngv-app/app/AbstractModel";

@Initial<TileOptions>({
    caption: 'Add Advance Passenger Information',
})


@Mixin(WithoutFocusOnClick)
export class PricingTile extends Tile<AbstractModel> implements WithoutFocusOnClick {

    selfDrawerContextModelPropagated() {
        this.setDataContent('Add Passport Information ');
    }


}