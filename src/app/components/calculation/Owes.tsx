import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';

export const Owes: React.FC = () => {
    const { participants, payments } = React.useContext(SplitBillStateContext);

    const totalOwes = participants.map((participant: Participant) => {
        const participantPayments = payments.filter(p => p.splitByIds.includes(participant.id)).map(p => {
            return {
                subject: p.name,
                ammount: (p.sum / p.splitByIds.length)
            }
        });
        return {
            participant: participant,
            payments: participantPayments
        };
    });

    return <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
            <h5>Total owes</h5>
        </div>
        {
            totalOwes.filter(p => p.payments.length > 0).map(to => <div key={to.participant.id} className="payment-block">
                <div className="d-flex w-100 justify-content-between mt-3">
                    <h6 className="mb-1">
                        {to.participant.name}
                    </h6>
                    <span>{to.payments.length > 0 && formattedValue(to.payments.map(a => a.ammount).reduce((a, b) => a + b))}</span>
                </div>
                {
                    to.payments.length > 0 && to.payments.map(p => <div key={`${p.subject}-${p.ammount}`} className="d-flex w-100 justify-content-between">
                        <small>{p.subject}: {formattedValue(p.ammount)}</small>
                    </div>)
                }
            </div>
            )
        }
    </React.Fragment>
}