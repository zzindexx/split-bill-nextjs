import { Payment, SplitBillState } from "./types";

export enum Actions {
    AddParticipant,
    RemoveParticipant,
    AddPayment,
    RemovePayment,
    RemoveParticipantFromPayments,
    UpdatePayment,
    InitializeData
}

export interface AddParticipant {
    type: Actions.AddParticipant;
    payload: string;
}

export interface RemoveParticipant {
    type: Actions.RemoveParticipant;
    payload: number;
}

export interface AddPayment {
    type: Actions.AddPayment;
    payload: Payment;
}

export interface RemovePayment {
    type: Actions.RemovePayment;
    payload: number;
}

export interface RemoveParticipantFromPayments {
    type: Actions.RemoveParticipantFromPayments;
    payload: number;
}

export interface UpdatePayment {
    type: Actions.UpdatePayment;
    payload: Payment;
}

export interface InitializeData {
    type: Actions.InitializeData;
    payload: SplitBillState;
}

export const addParticipant = (name: string): AddParticipant => ({
    type: Actions.AddParticipant,
    payload: name
});

export const removeParticipant = (id: number): RemoveParticipant => ({
    type: Actions.RemoveParticipant,
    payload: id
});

export const addPayment = (payment: Payment): AddPayment => ({
    type: Actions.AddPayment,
    payload: payment
});

export const removePayment = (id: number): RemovePayment => ({
    type: Actions.RemovePayment,
    payload: id
});

export const removeParticipantFromPayments = (id: number): RemoveParticipantFromPayments => ({
    type: Actions.RemoveParticipantFromPayments,
    payload: id
});

export const updatePayment = (payment: Payment): UpdatePayment => ({
    type: Actions.UpdatePayment,
    payload: payment
});

export const initializeData = (state: SplitBillState): InitializeData => ({
    type: Actions.InitializeData,
    payload: state
});

export type SplitBillActions = AddParticipant | AddPayment | RemoveParticipant | RemovePayment | RemoveParticipantFromPayments | UpdatePayment | InitializeData;