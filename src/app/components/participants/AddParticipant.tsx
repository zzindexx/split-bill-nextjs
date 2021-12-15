import React, { useState } from 'react';
import { addParticipant } from '../../../store/actions';
import { SplitBillDispatchContext } from '../../../store/reducer';

export const AddParticipant: React.FC = () => {
    const dispatch = React.useContext(SplitBillDispatchContext);
    const [newParticipantName, setNewParticipantName] = useState<string>("");
    const addNewParticipant = () => {
        dispatch(addParticipant(newParticipantName));
        setNewParticipantName("");
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        addNewParticipant();
        document.getElementById('dlg_addParticipant')?.classList.remove('show');
        document.body.classList.remove('modal-open');
        document.getElementsByClassName('modal-backdrop')[0].classList.remove('show');
    }

    return <React.Fragment>
        <div className="modal fade" id="dlg_addParticipant">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Participant</h5>
                        <span className="dlg-close-button" onClick={(e) => setNewParticipantName('')}>
                            <i className="bi bi-x-circle" data-bs-dismiss="modal"></i>
                        </span>
                    </div>
                    <div className="modal-body">
                        <form id="addEditParticipantForm" onSubmit={handleFormSubmit}>
                            <div className="mb-2">
                                <label htmlFor="txt_name" className="form-label">What were you paying for?</label>
                                <input type="text" className="form-control" id="txt_name" value={newParticipantName} onChange={(e) => setNewParticipantName(e.target.value)} />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => setNewParticipantName('')}>Close</button>
                            <button type="submit" form="addEditParticipantForm" className="btn btn-purple" data-bs-dismiss="modal" onClick={() => addNewParticipant()}>Add participant</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>;
}

export const ParticipantRemoveError: React.FC = () => {
    return <div className="modal fade" id="dlg_removeParticipantError">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="d-flex">
                        <span className="me-3" style={{ float: 'left', fontSize: '1.25rem', color: 'red' }}>
                            <i className="bi bi-exclamation-circle"></i>
                        </span>
                        <h5 className="modal-title">Cannot remove participant</h5>
                    </div>
                </div>
                <div className="modal-body">
                    <p>
                        Cannot delete this participant as he/she has made some payments or is included in some payments. Delete those payments first.
                </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>;
}

