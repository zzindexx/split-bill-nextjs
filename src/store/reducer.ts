import React from "react";
import { Actions, AppActions, SplitBillActions, StateActions } from "./actions";
import { ApplicationState, Participant, Payment, SplitBillState } from "./types";

export const initialState: SplitBillState = {
    participants: [],
    payments: []
}

export const initialAppState: ApplicationState = {
    saveData: true,
    showParticipantAddDialog: false,
    showParticipantErrorDialog: false,
    showPaymentAddDialog: false,
    showShareDialog: false
}

export const appReducer = (state: SplitBillState, action: SplitBillActions): SplitBillState => {
    switch (action.type) {
        case Actions.InitializeData:
            return action.payload;
        case Actions.AddParticipant:
            return {
                payments: state.payments,
                participants: [
                    ...state.participants,
                    {
                        id: state.participants.length === 0 ? 1 : state.participants[state.participants.length - 1].id + 1,
                        name: action.payload
                    }
                ]
            };
        case Actions.RemoveParticipant:
            return {
                payments: state.payments,
                participants: state.participants.filter((p: Participant) => p.id !== action.payload)
            };
        case Actions.AddPayment:
            return {
                participants: state.participants,
                payments: [
                    ...state.payments,
                    {
                        id: state.payments.length === 0 ? 1 : state.payments[state.payments.length - 1].id + 1,
                        name: action.payload.name,
                        sum: action.payload.sum,
                        paidById: action.payload.paidById,
                        splitByIds: action.payload.splitByIds
                    }
                ]
            };
        case Actions.RemovePayment:
            return {
                participants: state.participants,
                payments: [...state.payments.filter((p: Payment) => p.id !== action.payload)]
            };
        case Actions.RemoveParticipantFromPayments:
            return {
                participants: state.participants,
                payments: state.payments.map((payment: Payment) => {
                    if (!payment.splitByIds.map(s => s).includes(action.payload)) {
                        return payment;
                    } else {
                        let processedPayment = payment;
                        processedPayment.splitByIds = processedPayment.splitByIds.filter(p => p !== action.payload);
                        return processedPayment;
                    }
                })
            };
        case Actions.UpdatePayment:
            return {
                participants: state.participants,
                payments: state.payments.map((p: Payment) => {
                    if (p.id !== action.payload.id) {
                        return p;
                    } else {
                        p.paidById = action.payload.paidById;
                        p.splitByIds = action.payload.splitByIds;
                        p.name = action.payload.name;
                        p.sum = action.payload.sum;
                        return p;
                    }
                })
            };
        default:
            return state;
    }
}

export const appStateReducer = (state: ApplicationState, action: AppActions): ApplicationState => {
    switch (action.type) {
        case StateActions.SetSaveData:
            return {
                ...state,
                saveData: action.payload,
            };
        case StateActions.SetShowParticipantDialog:
            return {
                ...state,
                showParticipantAddDialog: action.payload
            };
        case StateActions.SetShowParticipantErrorDialog:
            return {
                ...state,
                showParticipantErrorDialog: action.payload
            };
        case StateActions.SetShowPaymentDialog:
            return {
                ...state,
                showPaymentAddDialog: action.payload
            };
        case StateActions.SetShowShareDialog:
            return {
                ...state,
                showShareDialog: action.payload
            };
        default:
            return state;
    }
}

export const SplitBillStateContext = React.createContext<SplitBillState>(initialState);
export const SplitBillDispatchContext = React.createContext<React.Dispatch<SplitBillActions>>(() => undefined);

export const SplitBillApplicationStateContext = React.createContext<ApplicationState>(initialAppState);
export const SplitBillApplicationDispatchContext = React.createContext<React.Dispatch<AppActions>>(() => undefined);
