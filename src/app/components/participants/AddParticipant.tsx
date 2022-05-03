import React, { useState } from 'react';
import { addParticipant, setShowParticipantDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillApplicationStateContext, SplitBillDispatchContext } from '../../../store/reducer';

export const AddParticipant: React.FC = () => {
    const dispatch = React.useContext(SplitBillDispatchContext);
    const appState = React.useContext(SplitBillApplicationStateContext);
    const dispatchApp = React.useContext(SplitBillApplicationDispatchContext);
    const [newParticipantName, setNewParticipantName] = useState<string>("");

    const closeDialog = (save: boolean) => {
        if (save) {
            dispatch(addParticipant(newParticipantName));
        }
        setNewParticipantName("");
        dispatchApp(setShowParticipantDialog(false));
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        closeDialog(true);
    }

    if (appState.showParticipantAddDialog === false) return null;

    return <React.Fragment>
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Participant</h5>
                        <span className="dlg-close-button" onClick={() => closeDialog(false)}>
                            <i className="bi bi-x-circle" data-bs-dismiss="modal"></i>
                        </span>
                    </div>
                    <div className="modal-body">
                        <form id="addEditParticipantForm" onSubmit={handleFormSubmit}>
                            <div className="mb-2">
                                <label htmlFor="txt_name" className="form-label">Participant name:</label>
                                <input type="text" className="form-control" id="txt_name" value={newParticipantName} onChange={(e) => setNewParticipantName(e.target.value)} autoFocus={true}/>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={(e) => closeDialog(false)}>Close</button>
                            <button type="submit" form="addEditParticipantForm" className="btn btn-purple" onClick={() => closeDialog(true)}>Add participant</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </React.Fragment>;
}