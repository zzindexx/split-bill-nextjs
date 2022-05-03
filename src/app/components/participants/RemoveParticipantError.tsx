import React from 'react';
import { setShowParticipantErrorDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillApplicationStateContext } from '../../../store/reducer';

export const ParticipantRemoveError: React.FC = () => {
    const appState = React.useContext(SplitBillApplicationStateContext);
    const appDispatch = React.useContext(SplitBillApplicationDispatchContext);

    if (appState.showParticipantErrorDialog === false) return null;

    return <React.Fragment>
        <div className="modal" style={{ display: 'block' }}>
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
                        <button type="button" className="btn btn-secondary" onClick={() => appDispatch(setShowParticipantErrorDialog(false))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show"></div>
    </React.Fragment>;
}

