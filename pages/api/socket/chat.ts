import { NextApiRequest } from "next";

const chat = async (req: NextApiRequest, res: any) => {
  if (req.method === 'POST' && res.socket.server.io) {
    const { message } = req.body
    console.log('message: ', message)

    res.socket.server.io.emit("chat", message)

    res.status(200).json({ message })
  }
}

export default chat;