import { NextApiRequest } from "next"

export default async function test(req: NextApiRequest, res: any) {
  if (req.method === 'GET')  {
    const response = await fetch('http://localhost:4000/coin/list', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    res.status(200).json(data)
  
    return data
  }
  
}