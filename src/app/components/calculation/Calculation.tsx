import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Owes } from './Owes';
import { TotalSpent } from './TotalSpent';
import { TotalSpentGraph } from './TotalSpentGraph';
import { WhoOwesWhom } from './WhoOwesWhom';

const Calculation: React.FC = () => {
    const state = React.useContext(SplitBillStateContext);
    const shouldShow: boolean = state.participants.length > 0 && state.payments.length > 0;

    return <React.Fragment>
            {!shouldShow && <div className="row">Info</div>}
            {shouldShow && <div className="row">
                <div className="col">
                    <WhoOwesWhom />
                    <Owes />
                </div>
                <div className="col">
                    <TotalSpent />
                    <TotalSpentGraph />
                </div>
            </div>}
    </React.Fragment>
}

export default Calculation;