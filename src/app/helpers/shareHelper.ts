import { initialState } from "../../store/reducer";
import { SplitBillState } from "../../store/types";

function b64EncodeUnicode(str: string) {
    return btoa(encodeURIComponent(str));
}

function b64DecodeUnicode(str: string) {
    return decodeURIComponent(atob(str));
}

export const stateToString = (state: SplitBillState) => {
    let returnObject = new Array();
    returnObject.push(state.participants.sort((a, b) => a.id - b.id).map(p => p.name));
    state.payments.forEach(payment => {
        const paymentArray = [
            payment.name,
            payment.sum,
            payment.paidById,
            payment.splitByIds
        ];
        returnObject.push(paymentArray)
    });

    return b64EncodeUnicode(JSON.stringify(returnObject));
}

export const stringToState = (str: string): SplitBillState => {
    const data = JSON.parse(b64DecodeUnicode(str));
    if (!Array.isArray(data)) return initialState;
    const dataArray = data as Array<any>;
    return {
        participants: (dataArray[0] as Array<string>).map((value, index) => ({id: index+1, name: value})),
        payments: dataArray.slice(1).map((value: any[], index: number) => {
            return {
                id: index + 1,
                name: value[0],
                sum: value[1],
                paidById: value[2],
                splitByIds: value[3]
            }
        })
    };
}