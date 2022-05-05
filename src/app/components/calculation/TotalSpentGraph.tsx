import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';
import { Card } from '../../shared/Card';
import { Graph } from '../../shared/Graph';

export const TotalSpentGraph: React.FC = () => {
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


    return <Card title="Total paid">
        <Graph id="totalSpentGraph" data={totalSpent} />
    </Card>
}