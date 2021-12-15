import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import App from '../src/app/App'
import Calculation from '../src/app/components/calculation/Calculation'
import Menu from '../src/app/components/menu/Menu'
import Participants from '../src/app/components/participants/Participants'
import Payments from '../src/app/components/payments/Payments'
import ShareDialog from '../src/app/components/sharedialog/ShareDialog'
import { initializeData } from '../src/store/actions'
import { appReducer, initialState, SplitBillDispatchContext, SplitBillSaveDataContext, SplitBillSaveDataDispatchContext, SplitBillStateContext } from '../src/store/reducer'
import styles from '../styles/Home.module.css'
import { formattedValue } from './../src/app/helpers/formattedValue';


const Home: NextPage = () => {
  return <App />
}

export default Home;
