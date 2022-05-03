export interface Participant {
    id: number;
    name: string;
}

export interface Payment {
    id: number,
    name: string;
    sum: number;
    paidById: number;
    splitByIds: number[];
}

export interface SplitBillState {
    participants: Participant[];
    payments: Payment[];
}

export interface ApplicationState {
    saveData: boolean;
    showParticipantAddDialog: boolean;
    showParticipantErrorDialog: boolean;
    showPaymentAddDialog: boolean;
}