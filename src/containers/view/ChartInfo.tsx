'use client';

import { Box, Stack, Typography } from "@mui/material";
import ChartGraph from "./ChartGraph";
import { useEffect, useState } from "react";

const ChartInfo = ({ assetId }: { assetId: number }) => {
  const [data, setData] = useState({
    id: 0,
    tickerSymbol: '',
    price: 0
  })

  useEffect(() => {
    const getInfo = async () => {
      const list_url = 'http://localhost:4000/coin/quotes/'
      const response = await fetch(list_url)
      const joResp = await response.json()
      console.log(joResp)
      if (joResp.flag) {
        setData({
          id: assetId,
          tickerSymbol: joResp.data[assetId].symbol_id,
          price: joResp.data[assetId].last_trade.price
        })
      }
    }
    getInfo()
  }, [assetId])

  return (
    <div>
      <Stack direction="row" spacing={2} margin='10px'>
        <Box>
          <Typography variant='h5'>{data.tickerSymbol}</Typography>
        </Box>
        <Box>
          <Typography variant='h5'>$ {data.price.toLocaleString()}</Typography>
        </Box>
      </Stack>


      <ChartGraph assetId={assetId} tickerSymbol={data.tickerSymbol} />
    </div>

  )
}

export default ChartInfo;