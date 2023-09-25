import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchAllUsers } from '@/utils/serverutils';
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | UsersApiResponseData[]>
) {


    const session = await getServerSession(req, res, authOptions)

    if (!session) {
        throw res.status(400).json({
            message: 'User not logged'
        })
    }

    const data = await fetchAllUsers();
    const maskedEmail = data.map((user: UsersApiResponseData) => {
        return {
            ...user,
            email: '***'
        }
    })

    res.status(200).json(maskedEmail)
}