import React, { useEffect, useState } from 'react';
import { addPayment, setShowPaymentDialog, updatePayment } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillApplicationStateContext, SplitBillDispatchContext, SplitBillStateContext } from '../../../store/reducer';
import { Participant, Payment } from '../../../store/types';
import CurrencyInput from 'react-currency-input-field';

export interface AddPaymentProps {
    payment?: Payment;
    onClose?: () => void;
}

export const AddPayment: React.FC<AddPaymentProps> = (props: AddPaymentProps) => {
    const { payments, participants } = React.useContext(SplitBillStateContext);
    const dispatch = React.useContext(SplitBillDispatchContext);
    const dispatchApp = React.useContext(SplitBillApplicationDispatchContext);
    const appState = React.useContext(SplitBillApplicationStateContext);
    let dlgTitle = "Add payment";

    const [subject, setSubject] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [priceStr, setPriceStr] = useState("");
    const [whoPaid, setWhoPaid] = useState<number>(0);
    const [splitBy, setSplitBy] = useState<number[]>(participants.map(p => p.id));
    const [btnText, setBtnText] = useState<string>("Add payment");

    useEffect(() => {
        if (props.payment !== undefined) {
            setSubject(props.payment.name);
            setPrice(props.payment?.sum ?? 0);
            setPriceStr(props.payment.sum.toString())
            setWhoPaid(props.payment?.paidById ?? participants[0].id);
            setSplitBy(props.payment?.splitByIds ?? participants.map(p => p.id));
            setBtnText("Save payment");
            dlgTitle = "Edit payment";
        } else {
            setSubject("");
            setPrice(0);
            setPriceStr('0,00');
            setWhoPaid(participants.length > 0 ? participants[0].id : -1);
            setSplitBy(participants.map(p => p.id));
            setBtnText("Add payment");
            dlgTitle = "Add payment";
        }

    }, [props.payment, participants]);

    const closeDialog = (saveData: boolean) => {
        if (saveData) {
            if (props.payment) {
                dispatch(
                    updatePayment({
                        id: props.payment.id,
                        name: subject,
                        sum: price,
                        paidById: whoPaid,
                        splitByIds: splitBy
                    }));
            } else {
                dispatch(
                    addPayment({
                        id: -1,
                        name: subject,
                        sum: price,
                        paidById: whoPaid,
                        splitByIds: splitBy
                    })
                );
            }
        }


        setSubject("");
        setPrice(0);
        setPriceStr("0")
        setWhoPaid(participants[0].id);
        setSplitBy(participants.map(p => p.id));

        if (props.onClose) {
            props.onClose();
        }

        dispatchApp(setShowPaymentDialog(false));
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        closeDialog(true);
    }

    if (appState.showPaymentAddDialog === false) return null;

    return <React.Fragment>

        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{dlgTitle}</h5>
                        <span className="dlg-close-button" onClick={(e) => closeDialog(false)}>
                            <i className="bi bi-x-circle"></i>
                        </span>
                    </div>
                    <div className="modal-body">
                        <form id="addEditPaymentForm" onSubmit={handleFormSubmit}>
                            <div className="mb-2">
                                <label htmlFor="txtSubject" className="form-label">What were you paying for?</label>
                                <input type="text" className="form-control" id="txtSubject" value={subject} onChange={(e) => setSubject(e.target.value)} autoFocus={true}/>
                            </div>

                            <div className="mb-2">
                                <label htmlFor="txtSum" className="form-label">Price</label>
                                <CurrencyInput
                                    value={priceStr}
                                    decimalsLimit={2}
                                    className="form-control"
                                    allowDecimals={true}
                                    prefix='$ '
                                    decimalSeparator=','
                                    groupSeparator=' '
                                    onValueChange={value => {
                                        setPriceStr(value || '');
                                        if (value !== '') {
                                            setPrice(Number(value?.replace(',', '.')));
                                        }
                                    }} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="ddlWhoPaid" className="form-label">Who paid?</label>
                                <select className="form-select" id="ddlWhoPaid" onChange={(e) => setWhoPaid(Number(e.target.value))} value={whoPaid}>
                                    {participants.map(participant => <option key={participant.id} value={participant.id}>{participant.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-1">
                                <label className="form-label">Split payment between</label>
                                {participants.map((participant: Participant) => {
                                    return <div key={participant.id} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={splitBy.includes(participant.id)} id={`presenceCheck_${participant.id}`} onChange={(e) => {
                                            if (e.target.checked) {
                                                setSplitBy([...splitBy, participant.id]);
                                            } else {
                                                setSplitBy([...splitBy.filter(id => id !== participant.id)]);
                                            }
                                        }} />
                                        <label className="form-check-label" htmlFor={`presenceCheck_${participant.id}`}>{participant.name}</label>
                                    </div>;
                                })}
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => closeDialog(false)}>Close</button>
                            <button type="submit" form="addEditPaymentForm" className="btn btn-purple" data-bs-dismiss="modal" onClick={() => closeDialog(true)}>{btnText}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </React.Fragment>;
}