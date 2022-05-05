import * as React from 'react';
import { setShowShareDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillApplicationStateContext, SplitBillStateContext } from '../../../store/reducer';



const ShareDialog = () => {
  const state = React.useContext(SplitBillStateContext);
  const dispatchApp = React.useContext(SplitBillApplicationDispatchContext);
  const appState = React.useContext(SplitBillApplicationStateContext);

  const [loading, setIsLoading] = React.useState(false);
  const [linkGenerated, setLinkGenerated] = React.useState(false);
  const [url, setUrl] = React.useState('');

  React.useEffect(() => {
    setLinkGenerated(false);
    setUrl("");
  }, [state]);

  const generateLink = async () => {
    setIsLoading(true);
    const response = await fetch("/api/generateLink", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    });
    const generatedId = await response.text();
    setUrl(`${window.location.origin}/${generatedId}`);
    setIsLoading(false);
    setLinkGenerated(true);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  if (appState.showShareDialog === false) return null;

  return <React.Fragment>
    <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Generate sharing link</h5>
            <button type="button" className="btn-close" onClick={() => dispatchApp(setShowShareDialog(false))}></button>
          </div>
          <div className="modal-body">
            {
              loading && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                </div>
              </div>
            }
            {
              !loading && !linkGenerated && <div className='d-flex justify-content-center' onClick={() => generateLink()}>
                <button className='btn btn-primary'>Generate link</button>
              </div>
            }
            {
              !loading && linkGenerated && <div className="input-group">
                <input type="text" className="form-control" value={url}/>
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={() => copyUrl()}>Copy</button>
                  </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
  </React.Fragment>
};

export default ShareDialog;