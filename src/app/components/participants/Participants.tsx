import * as React from 'react';
import { removeParticipant, setShowParticipantDialog, setShowParticipantErrorDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillDispatchContext, SplitBillStateContext } from '../../../store/reducer';
import { Participant } from '../../../store/types';
import { AddParticipant } from './AddParticipant';
import styles from './Participants.module.css';
import { ParticipantRemoveError } from './RemoveParticipantError';

const Participants: React.FC = () => {
    const state = React.useContext(SplitBillStateContext);
    const dispatch = React.useContext(SplitBillDispatchContext);

    const dispatchApp = React.useContext(SplitBillApplicationDispatchContext);

    return <React.Fragment>
        <div className="card border-left-primary shadow py-2 mb-2">
            <div className="card-body">
                <h5 className="card-title card-title-primary">
                    Participants
                </h5>

                {state.participants.length === 0 && <div className="fw-light fst-italic text-center">
                    Start by adding some participants
                </div>}
                <ul className="list-group list-group-flush">
                    {state.participants.length > 0 && state.participants.map((p: Participant) => {
                        const removeParticipantButton: JSX.Element =
                            state.payments.filter(payment => payment.paidById === p.id || payment.splitByIds.includes(p.id)).length === 0 ?
                                <i className="bi bi-trash-fill ml-3" onClick={() => dispatch(removeParticipant(p.id))}></i> :
                                <i className="bi bi-trash-fill ml-3" onClick={() => dispatchApp(setShowParticipantErrorDialog(true))}></i>;

                        return <li key={p.id} className={`list-group-item ${styles["participant-block"]} d-flex justify-content-between`}>
                            <span>
                                <i className="bi bi-person-fill me-1"> </i>
                                {p.name}
                            </span>
                            <span className={styles["remove-participant"]}>
                                {removeParticipantButton}
                            </span>
                        </li>;
                    })}
                </ul>


            </div>
            <div className="card-body card-body d-flex justify-content-end" style={{ paddingTop: '0px', paddingBottom: '10px' }}>
                <button className={`btn btn-outline-primary`} type="button" onClick={() => dispatchApp(setShowParticipantDialog(true))}>+ Add</button>
            </div>
        </div>
        <AddParticipant />
        <ParticipantRemoveError />
    </React.Fragment>;
}

export default Participants;