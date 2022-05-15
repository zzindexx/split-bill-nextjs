import React from 'react';
import { SplitBillStateContext } from '../../../store/reducer';
import styles from './../../../../styles/Menu.module.css';

export const Share = () => {
    const state = React.useContext(SplitBillStateContext);

    const [showDialog, setShowDialog] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [linkGenerated, setLinkGenerated] = React.useState(false);
    const [url, setUrl] = React.useState('');

    React.useEffect(() => {
        setLinkGenerated(false);
        setUrl("");
    }, [state]);

    const shareHandler = async () => {
        let generatedId;
        let generatedUrl;
        setShowDialog(true);
        if (!linkGenerated) {
            setIsLoading(true);
            const response = await fetch("/api/generateLink", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state)
            });
            generatedId = await response.text();
            generatedUrl = `${window.location.origin}/${generatedId}`
            setUrl(generatedUrl);
            setLinkGenerated(true);
            setIsLoading(false);
        }

        if (typeof (navigator.share) !== 'undefined') {
            setShowDialog(false);
            navigator.share({
                url: generatedUrl
            });
        }
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(url);
    };


    return (
        <React.Fragment>
            <button className={`btn btn-primary ${styles["btn-share"]}`} onClick={() => shareHandler()}>
                <i className="bi bi-share-fill"></i>
            </button>
            {showDialog && <React.Fragment>
                <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Share</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDialog(false)}></button>
                            </div>
                            <div className="modal-body">
                                {
                                    isLoading && <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                        </div>
                                    </div>
                                }
                                {
                                    !isLoading && linkGenerated && <div className="input-group">
                                        <input type="text" className="form-control" value={url} readOnly/>
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
            </React.Fragment>}
        </React.Fragment>
    )
}

