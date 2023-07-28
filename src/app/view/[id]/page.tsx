'use client'
import styles from './page.module.css'
import { Button, Grid, Stack } from '@mui/material'
import ChartInfo from '@/containers/view/ChartInfo'
import OrderbookList from '@/containers/view/OrderbookList'
import OrderForm from '@/containers/view/OrderForm'
import TradingList from '@/containers/view/TradingList'
import ChatDialog from '@/containers/view/ChatDialog'
import { useState } from 'react'

export default function View({ params }: { params: { id: number }}) {
  const [showChatDialog, setShowChatDialog] = useState<boolean>(false)

  return (
    <main className={styles.main}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <ChartInfo assetId={params.id} />
        </Grid>
        <Grid item xs={5}>
          <OrderbookList />
        </Grid>
        <Grid item xs={4}>
          <OrderForm />
        </Grid>
        <Grid item xs={8}>
          <Stack direction='row' justifyContent='space-around' alignItems='center'>
            <TradingList />

            <Button onClick={() => setShowChatDialog(true)} variant='contained'>Live Chat</Button>
          </Stack>

          <ChatDialog 
            open={showChatDialog}
            onHide={() => setShowChatDialog(false)}
          />
        </Grid>
      </Grid>
    </main>
  )
}
