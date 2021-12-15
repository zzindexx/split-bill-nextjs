import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';
import { Graph } from '../../shared/Graph';

export const TotalSpent: React.FC = () => {
    const { payments, participants } = React.useContext(SplitBillStateContext);

    let totalSpentAmmount: number = 0;
    let totalSpent: { participant: Participant, totalSpent: number }[] = new Array();
    participants.forEach((participant: Participant) => {
        const spent: number = payments.filter(payment => payment.paidById === participant.id).length > 0 ? payments.filter(payment => payment.paidById === participant.id).map(pa => pa.sum).reduce((sum, cur) => sum + cur) : 0;
        if (spent > 0) {
            totalSpent.push({
                participant: participant,
                totalSpent: spent
            });
        }
        totalSpentAmmount += spent;
    });


    return <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-3 border-bottom">
            <h5>Total paid</h5>
        </div>
        <Graph id="totalSpentGraph" labels={totalSpent.map(t => t.participant.name)} type='doughnut' values={totalSpent.map(t => t.totalSpent)} />
        {totalSpent.map((spentRow) => <div key={spentRow.participant.id} className="d-flex w-50 mx-auto justify-content-between mt-1">
            <span>
                {spentRow.participant.name}
            </span>
            <span>{formattedValue(spentRow.totalSpent)}</span>
        </div>
        )}
        <div className="d-flex w-75 mx-auto justify-content-between mt-1 fw-bold">
            <span>
                Total spent
            </span>
            <span>{formattedValue(totalSpentAmmount)}</span>
        </div>
    </React.Fragment>
}