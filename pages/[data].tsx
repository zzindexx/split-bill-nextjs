import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import App from '../src/app/App'


const SavedPage: NextPage<{data: string}> = ({data}) => {
    return <App data={data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            data: context?.params?.data
        }
    }
  }

export default SavedPage;
