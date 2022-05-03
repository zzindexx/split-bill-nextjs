import * as React from 'react';
import { removePayment, setShowPaymentDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillDispatchContext, SplitBillStateContext } from '../../../store/reducer';
import { Payment } from '../../../store/types';
import { formattedValue } from '../../helpers/formattedValue';
import { AddPayment } from './AddPayments';
import styles from './Payments.module.css';

const Payments: React.FC = () => {
    const state = React.useContext(SplitBillStateContext);
    const dispatch = React.useContext(SplitBillDispatchContext);
    const dispatchApp = React.useContext(SplitBillApplicationDispatchContext);

    const [editingPayment, seteditingPayment] = React.useState<Payment | null>(null)

    return <React.Fragment>
        <div className="card rounded-3 mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    Payments
                </h5>
                <ul className="list-group list-group-flush">
                    {state.payments.length === 0 && <div className="fw-light fst-italic text-center">
                        Add at least one payment to see calculation results
                    </div>}
                    {state.payments.map((payment: Payment) => {
                        return <li key={payment.id} className={`${styles["payment-block"]} list-group-item`}>
                            <div className="d-flex w-100 justify-content-between mt-2">
                                <h6 className="mb-1">{payment.name}</h6>
                                <small>{formattedValue(payment.sum)}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <small>
                                    Split to: {payment.splitByIds.length === state.participants.length ? 'All' : state.participants.filter(p => payment.splitByIds.includes(p.id)).map(p => p.name).join(', ')} <br />
                                    Paid by {state.participants.find(p => p.id === payment.paidById)?.name}
                                </small>
                                <span>
                                    <span className={`${styles["edit-payment"]} text-primary`}>
                                        <i className="bi bi-pen-fill me-3 edit-payment" onClick={() => {
                                            seteditingPayment(payment);
                                            dispatchApp(setShowPaymentDialog(true));
                                        }}></i>
                                    </span>
                                    <span className={`${styles["remove-payment"]} text-danger`}>
                                        <i className="bi bi-trash-fill remove-payment" onClick={() => dispatch(removePayment(payment.id))}></i>
                                    </span>
                                </span>
                            </div>
                        </li>;
                    })}
                </ul>
            </div>
            <div className="card-body d-flex justify-content-end" style={{ paddingTop: '0px', paddingBottom: '10px' }}>
                <button className={`btn btn-outline-purple`} type="button" onClick={() => dispatchApp(setShowPaymentDialog(true))}>+ Add</button>
            </div>
        </div>
        {editingPayment ? <AddPayment payment={editingPayment} onClose={() => seteditingPayment(null)} /> : <AddPayment />}
    </React.Fragment>
}

export default Payments;