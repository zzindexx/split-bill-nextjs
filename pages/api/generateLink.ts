import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    if (req.method === "POST") {
        const id = nanoid(10);
        const account = process.env.STORAGE_ACCOUNT as string;
        const accountKey = process.env.STORAGE_ACCOUNT_KEY as string;
        const tableName = process.env.TABLE_NAME as string;
        const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey);
        const client = new TableClient(`https://${account}.table.core.windows.net`,`${tableName}`, sharedKeyCredential);
        const newRow = {
            partitionKey: "1",
            rowKey: id,
            data: JSON.stringify(req.body)
        };
        let result = await client.createEntity(newRow);
        res.status(200).json(id);
    } else {
        res.status(404);
    }

}