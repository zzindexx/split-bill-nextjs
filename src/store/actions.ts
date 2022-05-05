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


export enum StateActions {
    SetSaveData,
    SetShowParticipantDialog,
    SetShowParticipantErrorDialog,
    SetShowPaymentDialog,
    SetShowShareDialog
}

export interface SetSaveData {
    type: StateActions.SetSaveData,
    payload: boolean
}
export interface SetShowParticipantDialog {
    type: StateActions.SetShowParticipantDialog,
    payload: boolean
}
export interface SetShowParticipantErrorDialog {
    type: StateActions.SetShowParticipantErrorDialog,
    payload: boolean
}

export interface SetShowPaymentDialog {
    type: StateActions.SetShowPaymentDialog,
    payload: boolean
}

export interface SetShowShareDialog {
    type: StateActions.SetShowShareDialog,
    payload: boolean
}

export const setSaveData = (enabled: boolean): SetSaveData => ({
    type: StateActions.SetSaveData,
    payload: enabled
});
export const setShowParticipantDialog = (enabled: boolean): SetShowParticipantDialog => ({
    type: StateActions.SetShowParticipantDialog,
    payload: enabled
});
export const setShowParticipantErrorDialog = (enabled: boolean): SetShowParticipantErrorDialog => ({
    type: StateActions.SetShowParticipantErrorDialog,
    payload: enabled
});

export const setShowPaymentDialog = (enabled: boolean): SetShowPaymentDialog => ({
    type: StateActions.SetShowPaymentDialog,
    payload: enabled
});

export const setShowShareDialog = (enabled: boolean): SetShowShareDialog => ({
    type: StateActions.SetShowShareDialog,
    payload: enabled
});

export type AppActions = SetSaveData | SetShowParticipantDialog | SetShowParticipantErrorDialog | SetShowPaymentDialog | SetShowShareDialog;