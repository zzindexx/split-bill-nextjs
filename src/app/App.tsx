import Head from 'next/head';
import React from 'react';
import { initializeData, setSaveData } from '../store/actions';
import { appReducer, appStateReducer, initialAppState, initialState, SplitBillApplicationDispatchContext, SplitBillApplicationStateContext, SplitBillDispatchContext, SplitBillStateContext } from '../store/reducer';
import { SplitBillState } from '../store/types';
import Calculation from './components/calculation/Calculation';
import Menu from './components/menu/Menu';
import Participants from './components/participants/Participants';
import Payments from './components/payments/Payments';
import { formattedValue } from './helpers/formattedValue';

const App: React.FC<{ data?: string }> = ({ data }) => {
  let currentState: SplitBillState;

  if (data) {
    currentState = JSON.parse(data);
  } else {
    currentState = initialState;
  }

  const [state, dispatch] = React.useReducer(appReducer, currentState);
  const [appState, dispatchApp] = React.useReducer(appStateReducer, initialAppState);

  React.useEffect(() => {
    const saveDataString = localStorage.getItem("splitbill-savedata");
    if (saveDataString) {
      dispatchApp(setSaveData(JSON.parse(saveDataString)));
    }

    const stateString = localStorage.getItem("splitbill-data");
    if (stateString && typeof(data) === 'undefined') {
      dispatch(initializeData(JSON.parse(stateString)));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("splitbill-savedata", JSON.stringify(appState.saveData));
    if (appState.saveData && JSON.stringify(state) !== JSON.stringify(initialState)) {
      localStorage.setItem("splitbill-data", JSON.stringify(state));
    }
  }, [appState, state]);

  let pageTitle = 'Split the bill';
  let total = 0;
  if (state.participants.length > 0 && state.payments.length > 0) {
    total = state.payments.map(p => p.sum).reduce((sum, cur) => sum + cur);
    pageTitle = `Split the ${formattedValue(total)} bill with ${state.participants.length} people`;
  }

  return (
    <div className="d-flex flex-column">
      <div className='content'>
        <Head>
          <title>
            {pageTitle}
          </title>
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={`This is how we split our ${formattedValue(total)} bill`} />
          <meta name="description" content={`This is how we split our ${formattedValue(total)} bill`} />

          <link href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&amp;display=swap" rel="stylesheet" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossOrigin="anonymous" />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossOrigin="anonymous"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"></link>
        </Head>

        <SplitBillApplicationStateContext.Provider value={appState}>
          <SplitBillApplicationDispatchContext.Provider value={dispatchApp}>
            <SplitBillStateContext.Provider value={state}>
              <SplitBillDispatchContext.Provider value={dispatch}>
                <Menu />
                <div className="container p-3 pt-5">
                  <div className="row">
                    <div className="col-lg-3 sidebar">
                      <Participants />
                      <Payments />
                    </div>
                    <div className="col-lg-9">
                      <Calculation />
                    </div>
                  </div>
                </div>
              </SplitBillDispatchContext.Provider>
            </SplitBillStateContext.Provider>
          </SplitBillApplicationDispatchContext.Provider>
        </SplitBillApplicationStateContext.Provider>
      </div>
    </div>
  )
};




export default App;
