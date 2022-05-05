import Link from 'next/link';
import React from 'react';
import { setSaveData, setShowShareDialog } from '../../../store/actions';
import { SplitBillApplicationDispatchContext, SplitBillApplicationStateContext } from '../../../store/reducer';
import styles from './../../../../styles/Menu.module.css';

const Menu: React.FC = () => {
    const appState = React.useContext(SplitBillApplicationStateContext);
    const appDispatch = React.useContext(SplitBillApplicationDispatchContext);

    return <nav className="navbar navbar-expand-lg navbar-light bg-white shadow pt-3 pb-4">
        <div className="container">
            <Link href="/">
                <a style={{ textDecoration: 'none' }}>
                    <img className="me-2" style={{ width: '35px' }} src="/wallet.png"></img>
                    <span className="navbar-brand mb-0 h1" style={{verticalAlign: 'middle'}}>Split the bill</span>
                </a>
            </Link>

            <div className="collapse navbar-collapse">
            </div>


            <div className="dropdown ms-3">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-gear-fill"></i>
                </button>
                <ul className={`dropdown-menu ${styles['dropdown-menu']}`} aria-labelledby="dropdownMenuButton1">
                    <li>
                        <div className={`${styles['dropdown-element']} form-check form-switch`}>
                            <input className={`form-check-input ${styles.switch}`} type="checkbox" id="flexSwitchCheckDefault" checked={appState.saveData} onChange={(e) => appDispatch(setSaveData(!appState.saveData))} />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Save in browser</label>
                        </div>

                    </li>
                </ul>
            </div>

            
            <button className={`btn btn-primary ${styles["btn-share"]}`} onClick={() => appDispatch(setShowShareDialog(true))}><i className="bi bi-share-fill"></i></button>

        </div>
    </nav>;
}

export default Menu;

/*
<div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="index.html">Calculator</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="projects-grid-cards.html">How it works</a></li>
                </ul>
            </div>
*/