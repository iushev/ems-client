import React, { Component } from 'react';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';

import TextField from 'modules/common/components/Form/TextField';

import InspectionItemField from './InspectionItemField';

class LifeguardPerformance extends Component {
    evaluation_rates = [
        {text: 'Excellent', value: 'excellent'},
        {text: 'Good', value: 'good'},
        {text: 'Poor', value: 'poor'},
    ];

    render() {
        return (
            <div>
                <Typography variant='h5'>Lifeguard(s) Performance:</Typography>
                <InspectionItemField
                    name='inspectionProperties.guard_in_proper_position_vigilant'
                    label='Guard in proper position/vigilant (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.guard_is_in_uniform'
                    label='Guard is in uniform (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.rescue_and_first_aid_equipment_properly_setup_and_used'
                    label='Rescue and First Aid equipment (backboard/straps, rescue tube, First Aid Kit) properly setup and used (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.certificates_are_present_and_copies_are_posted'
                    label='Certificates are present, and copies are posted (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_rules_enforced'
                    label='Pool rules enforced (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_passes_policy_enforced'
                    label='Pool passes policy enforced (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.all_chemicals_in_proper_levels'
                    label='All chemicals in proper levels (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.log_book_properly_filled_out'
                    label='Log Book properly filled out (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.water_quality_board_filled_out'
                    label='Water Quality Board filled out (CPI)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.emergency_gate_unlocked'
                    label='Emergency gate unlocked'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.water_clarity'
                    label='Water clarity (if main drain cover is not visible, pool should be closed)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_bottom_is_clean'
                    label='Pool bottom is clean (vacuumed)'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.waterline_tiles_are_clean'
                    label='Waterline tiles are clean'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_deck_area_is_swept_and_trash_picked_up'
                    label='Pool deck area is swept, and trash picked up'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.skimmer_baskets_emptied'
                    label='Skimmer baskets emptied'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.deck_furniture_is_organized'
                    label='Deck furniture is organized'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.trash_can_bags_regularly_replaced'
                    label='Trash can bags regularly replaced'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.guard_room_clean_and_organized'
                    label='Guard room clean and organized'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.filter_room_clean_and_organized'
                    label='Filter room clean and organized'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_cleaning_equipment_neatly_stored'
                    label='Pool cleaning equipment neatly stored'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.bathrooms_cleaned_and_janitorial_supplies_are_stocked'
                    label='Bathrooms cleaned, and janitorial supplies are stocked'
                    options={this.evaluation_rates}
                />
                <InspectionItemField
                    name='inspectionProperties.overall_performance_grade'
                    label='Overall Performance Grade'
                    options={this.evaluation_rates}
                />
                <Field
                    label='Notes'
                    name='inspectionProperties.lifeguard_performance_notes'
                    component={TextField}
                    fullWidth
                    multiline
                    margin='dense'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
        );
    }
}

LifeguardPerformance.propTypes = {

};

export default LifeguardPerformance;