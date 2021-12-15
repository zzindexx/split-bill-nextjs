import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';


function roundToTwo(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function isBalanceZero(balance: number[]): boolean {
    if (balance.every(b => b === 0)) return true;
    if (balance.filter(b => b===0).length === balance.length - 1) return true;
    return false;
}

export const WhoOwesWhom: React.FC = () => {
    const { payments, participants } = React.useContext(SplitBillStateContext);

    let isError: boolean = false;

    const participantsBalance = participants.map((participant: Participant) => {
        const spentByParticipant = payments.filter(p => p.paidById === participant.id).length > 0 ? payments.filter(p => p.paidById === participant.id).map(p => p.sum).reduce((sum, cur) => sum + cur) : 0;
        const owesByParticipant = payments.filter(p => p.splitByIds.includes(participant.id)).length > 0 ? payments.filter(p => p.splitByIds.includes(participant.id)).map(p => p.sum / p.splitByIds.length).reduce((sum, cur) => sum + cur) : 0;
        return {
            participant: participant,
            balance: roundToTwo(spentByParticipant - owesByParticipant)
        };
    }).sort((a, b) => a.balance - b.balance);

    let trasfers: { [key: number]: { to: number, sum: number }[] } = {};
    let allZeroBalance = isBalanceZero(participantsBalance.map(p => p.balance));
    let i = 0;
    while (!allZeroBalance && i < 500) {
        const sumToGive = participantsBalance[participantsBalance.length - 1].balance > -participantsBalance[0].balance ? -participantsBalance[0].balance : participantsBalance[participantsBalance.length - 1].balance;

        if (trasfers[participantsBalance[0].participant.id]) {
            trasfers[participantsBalance[0].participant.id].push({
                to: participantsBalance[participantsBalance.length - 1].participant.id,
                sum: sumToGive
            });
        } else {
            trasfers[participantsBalance[0].participant.id] = [{
                to: participantsBalance[participantsBalance.length - 1].participant.id,
                sum: sumToGive
            }];
        }

        participantsBalance[0].balance = roundToTwo(participantsBalance[0].balance + sumToGive);
        participantsBalance[participantsBalance.length - 1].balance = roundToTwo(participantsBalance[participantsBalance.length - 1].balance - sumToGive);

        participantsBalance.sort((a, b) => a.balance - b.balance);
        allZeroBalance = isBalanceZero(participantsBalance.map(p => p.balance));
        i++;
    }

    if (i === 500) {
        isError = true;
    }

    return <React.Fragment>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3 border-bottom">
            <h5>Who owes whom</h5>
        </div>
        <div className="mb-3">
            {Object.keys(trasfers).map((id: string) =>
                trasfers[Number(id)].map(ow =>
                    <div key={`${id}-${ow.to}`}className="d-flex w-100 justify-content-between mt-1">
                        <span>
                        {participants.filter((p: Participant) => p.id === Number(id))[0].name} owes {participants.filter((p: Participant) => p.id === ow.to)[0].name}
                        </span>
                        <span>{formattedValue(ow.sum)}</span>
                    </div>
                )
            )}
        </div>
    </React.Fragment>;;
}