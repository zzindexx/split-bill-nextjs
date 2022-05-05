import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { first, last } from '../../helpers/ExtendedArray';
import { formattedValue } from '../../helpers/formattedValue';
import { Card } from '../../shared/Card';


function roundToTwo(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function isBalanceZero(balance: number[]): boolean {
    if (balance.every(b => b === 0)) return true;
    if (balance.filter(b => b === 0).length === balance.length - 1) return true;
    return false;
}

export const WhoOwesWhom: React.FC = () => {
    const { payments, participants } = React.useContext(SplitBillStateContext);

    let isError: boolean = false;

    const participantsBalance = participants.map((participant: Participant) => {
        const spentByParticipant = payments.filter(p => p.paidById === participant.id).map(p => p.sum).reduce((sum, cur) => sum + cur, 0);
        const owesByParticipant = payments.filter(p => p.splitByIds.includes(participant.id)).map(p => p.sum / p.splitByIds.length).reduce((sum, cur) => sum + cur, 0);
        return {
            participant: participant,
            balance: roundToTwo(spentByParticipant - owesByParticipant)
        };
    }).sort((a, b) => a.balance - b.balance);

    let transfers = new Map();

    let allZeroBalance = isBalanceZero(participantsBalance.map(p => p.balance));
    let i = 0;
    while (!allZeroBalance && i < 500) {
        let sumToGive = 0;
        if (last(participantsBalance).balance > -first(participantsBalance).balance)
            sumToGive = - first(participantsBalance).balance;
        else
            sumToGive = last(participantsBalance).balance;
        
        transfers.set(
            participantsBalance[0].participant.id,
            {
                to: participantsBalance[participantsBalance.length - 1].participant.id,
                sum: sumToGive
            }
        )

        first(participantsBalance).balance = roundToTwo(first(participantsBalance).balance + sumToGive);
        last(participantsBalance).balance = roundToTwo(last(participantsBalance).balance - sumToGive);

        participantsBalance.sort((a, b) => a.balance - b.balance);
        allZeroBalance = isBalanceZero(participantsBalance.map(p => p.balance));
        i++;
    }

    if (i === 500) {
        isError = true;
    }

    if (isError) return null;

    let resultingElement: JSX.Element[] = [];
    transfers.forEach((value, key) => {
        const element = <div key={`${key}-${value.to}`} className="d-flex w-100 justify-content-between mt-1">
            <span>
                {participants.filter((p: Participant) => p.id === Number(key))[0].name} owes {participants.filter((p: Participant) => p.id === value.to)[0].name}
            </span>
            <span>{formattedValue(value.sum)}</span>
        </div>;
        resultingElement.push(element);
    })

    return <Card title="Who owes whom">
        {
            resultingElement
        }
    </Card>;
}