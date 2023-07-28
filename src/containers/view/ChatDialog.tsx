'use client';

import { Dialog, DialogContent, DialogTitle, Paper, Grid, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { io as ClientIO } from 'socket.io-client'

type Message = {
  message: string;
}

const ChatDialog = ({ open, onHide } : {open: boolean, onHide: () => void }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (open) {
      const socket = new (ClientIO as any)('/', {
        path: '/api/socket/io',
        addTrailingSlash: false
      })

      socket.on('connect', () => {
        console.log('Socket connected', socket.id)
      });

      socket.on('chat', (msg: string) => {
        setMessages((currentMsg) => [
          ...currentMsg,
          { message: msg }
        ])
      })

      return () => {
        if (socket) socket.disconnect()
      }
    }
  }, [open])


  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      if (message) {
        sendMessage() 
      }
    }
  }

  const sendMessage = async () => {
    if (message) {
      const response = await fetch('/api/socket/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })

      if (response.ok) {
        setMessage('')
      }
    }
  }

  return (
    <Dialog open={open} onClose={onHide}>
      <DialogTitle>Live Chat</DialogTitle>
      <DialogContent sx={{ width: '380px', backgroundColor: '#c9c9c9' }}>
        <Grid container sx={{ width: '100%' }}>
          <List sx={{ height: '60vh', overflowY: 'true' }}>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg.message} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid container sx={{ backgroundColor: '#fff' }}>
          <Grid item xs={10}>
            <TextField fullWidth label="Type something" value={message} onChange={(e) => setMessage(e.target.value)} onKeyUp={handleKeyUp} />
          </Grid>
          <Grid item xs={2} display='flex' alignItems='center'>
            <Button fullWidth onClick={() => sendMessage()}><SendIcon /></Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ChatDialog;