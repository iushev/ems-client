import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import InspectionItemField from './InspectionItemField';

class PoolFacilityChecklist extends Component {
    options = [
        {text: 'Yes', value: 'yes'},
        {text: 'No', value: 'no'},
    ];

    render() {
        return (
            <div>
                <Typography variant='h5'>Pool Facility Checklist:</Typography>
                <InspectionItemField
                    name='inspectionProperties.main_drain_covers_secured'
                    label='Main drain cover(s) secured?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.handrails_ladders_secured'
                    label='Handrails/Ladders secured?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.emergency_gate_labeled'
                    label='Emergency Gate labeled?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.pool_fence_in_good_repair'
                    label='Pool Fence in good repair?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.ppe_for_chemical_safety_present_in_pump_room'
                    label='PPE (Apron, Goggles, and Gloves) for chemical safety present in pump room?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.test_kits_and_reagents_stocked'
                    label='Test Kits and Reagents stocked?'
                    options={this.options}
                />
                <InspectionItemField
                    name='inspectionProperties.blood_bourne_pathogens_cleanup_kit_present'
                    label='Blood Bourne Pathogens Cleanup Kit present?'
                    options={this.options}
                />
            </div>
        );
    }
}

PoolFacilityChecklist.propTypes = {

};

export default PoolFacilityChecklist;