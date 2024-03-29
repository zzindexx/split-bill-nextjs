import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';
import { Card } from '../../shared/Card';
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


    return <Card title="Total paid">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Participant</th>
                            <th className='text-end'>Total paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalSpent.map((spentRow) => <tr key={spentRow.participant.id}>
                            <td>
                                {spentRow.participant.name}
                            </td>
                            <td className='text-end'>{formattedValue(spentRow.totalSpent)}</td>
                        </tr>
                        )}
                        <tr>
                            <th scope='row'>Total:</th>
                            <th scope='row' className='text-end'>{formattedValue(totalSpentAmmount)}</th>
                        </tr>
                    </tbody>
                </table>
    </Card>
}