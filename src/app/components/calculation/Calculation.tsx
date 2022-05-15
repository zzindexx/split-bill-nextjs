import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Card } from '../../shared/Card';
import { Owes } from './Owes';
import { TotalSpent } from './TotalSpent';
import { TotalSpentGraph } from './TotalSpentGraph';
import { WhoOwesWhom } from './WhoOwesWhom';

const Calculation: React.FC = () => {
    const state = React.useContext(SplitBillStateContext);
    const shouldShow: boolean = state.participants.length > 0 && state.payments.length > 0;

    if (!shouldShow)
        return <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="card shadow">
                        <div className="card-body d-flex justify-content-center">
                            <h6>Please add participants and payments to see the results</h6>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>;

    return <React.Fragment>
        <div className="row">
            <div className="col">
                <WhoOwesWhom />
                <Owes />
            </div>
            <div className="col">
                <TotalSpent />
                <TotalSpentGraph />
            </div>
        </div>
    </React.Fragment>
}

export default Calculation;