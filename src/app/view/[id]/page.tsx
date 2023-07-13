'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { Grid } from '@mui/material'
import ChartInfo from '@/containers/view/ChartInfo'
import OrderbookList from '@/containers/view/OrderbookList'
import OrderForm from '@/containers/view/OrderForm'
import TradingList from '@/containers/view/TradingList'
import ChatDialog from '@/containers/view/ChatDialog'

export default function View({ params }: { params: { id: number }}) {
  return (
    <main className={styles.main}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <ChartInfo assetId={params.id} />
        </Grid>
        <Grid item xs={4}>
          <OrderbookList />
        </Grid>
        <Grid item xs={4}>
          <OrderForm />
        </Grid>
        <Grid item xs={8}>
          <TradingList />
          <ChatDialog />
        </Grid>
      </Grid>
    </main>
  )
}
