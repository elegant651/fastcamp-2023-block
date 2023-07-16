import { NextApiRequest } from "next";
import { Server as ServerIO } from 'socket.io';

const io = async (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io"
    console.log('New server request: ', path)
    const httpServer = res.socket.server
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false
    })
    res.socket.server.io = io
  }
  res.end()
}

export default io