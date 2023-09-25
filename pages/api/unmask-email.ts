import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllUsers } from '@/utils/serverutils';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ email: string } | ResponseData>
) {

    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        throw res.status(400).json({
            message: 'User not logged'
        })
    }
    const userId = +(req?.query['userId'] ?? '');
    if (!userId) {
        throw res.status(400).json({
            message: 'No user id'
        });
    }

    const data: UsersApiResponseData[] = await fetchAllUsers();
    const email = data.find(({ id }) => id === userId)?.email ?? '';

    res.status(200).json({ email })
}