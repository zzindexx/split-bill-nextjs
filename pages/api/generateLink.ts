import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
import { createCipheriv } from 'crypto';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    if (req.method === "POST") {
        const key: string = process.env.ENCRPTION_KEY as string;
        const iv: string = process.env.ENCRPTION_IV as string;
        const cypher = createCipheriv('aes256', key, iv);
        const encryptedData = cypher.update(JSON.stringify(req.body), 'utf-8', 'hex') + cypher.final('hex');
        const id = nanoid(10);
        const account = process.env.STORAGE_ACCOUNT as string;
        const accountKey = process.env.STORAGE_ACCOUNT_KEY as string;
        const tableName = process.env.TABLE_NAME as string;
        const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
        const client = new TableClient(`https://${account}.table.core.windows.net`,`${tableName}`, sharedKeyCredential);
        const newRow = {
            partitionKey: "1",
            rowKey: id,
            data: encryptedData
        };
        let result = await client.createEntity(newRow);
        res.status(200).json(id);
    } else {
        res.status(404);
    }

}