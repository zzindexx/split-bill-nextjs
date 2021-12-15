import * as React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import { stateToString } from '../../helpers/shareHelper';



const ShareDialog = () => {
    const state = React.useContext(SplitBillStateContext);
    const [url, setUrl] = React.useState('');

    React.useEffect(() => {
        setUrl(`${window.location.origin}/${stateToString(state)}`);
    }, [state]);

    return <div className="modal fade" id="dlg_Share">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add participant</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id="shareLinkForm">
              <div className="form-group">
                <label htmlFor="tb_newParticipantName" className="form-label">Url</label>
                <input type="text" className="form-control" id="tb_newParticipantName" value={url} readOnly />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="submit" form="addParticipantForm" className="btn btn-purple" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  };

  export default ShareDialog;