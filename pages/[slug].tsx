import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables'
import { createDecipheriv } from 'crypto'
import type { GetServerSideProps, NextPage } from 'next'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import App from '../src/app/App'


const SavedPage: NextPage<{ data: string }> = ({ data }) => {
    return <App data={data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context?.params?.slug) {
        const slug = context.params.slug.toString();
        const account = process.env.STORAGE_ACCOUNT as string;
        const accountKey = process.env.STORAGE_ACCOUNT_KEY as string;
        const tableName = process.env.TABLE_NAME as string;
        const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
        const client = new TableClient(`https://${account}.table.core.windows.net`,`${tableName}`, sharedKeyCredential);
    
        const entity = await client.getEntity("1", slug).catch(() => console.log("Entity not found"));
        if (entity) {
            const key: string = process.env.ENCRPTION_KEY as string;
            const iv: string = process.env.ENCRPTION_IV as string;
            const cypher = createDecipheriv('aes256', key, iv);
            const decryptedData = cypher.update(entity.data as string, 'hex', 'utf-8') + cypher.final('utf-8');
            return {
                props: {
                    data: decryptedData
                }
            }
        }
        
    }
    return {
        redirect: {
            destination: "/",
            permanent: false
        }
      }
}

export default SavedPage;
