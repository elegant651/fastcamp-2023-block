'use client';

import styled from "@emotion/styled";
import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'

const TRADE_URL = 'http://localhost:4000/trades'

interface TradeData {
  id: number
  amount: number
  price: number
  traded_at: string
}

const TradingList = () => {
  const [list, setList] = useState<TradeData[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(TRADE_URL)
      const joResp = await response.json()

      if(joResp.flag) {
        setList(joResp.data)
      }
    }
    fetchList()
  }, [])

  return (
    <Box>
      <Box><Typography variant='h5'>Trade List</Typography></Box>
      <TradeList>
        {list.map((item, index) => (
          <Box key={index}>
            <ListItem>
              <ListItemText>
                <Typography variant='body1'>{item.id}</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant='body1'>{item.amount.toLocaleString()}개, {item.price.toLocaleString()}원</Typography>
              </ListItemText>
              <ListItemText>
                <Typography variant="body2">{dayjs(item.traded_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </TradeList>
    </Box>
  )
}

const TradeList = styled(List)`
  width: 500px;
  height: 340px;
  border: 1px solid #b2b2b2;
  border-radius: 10px;
  overflow: auto;
`

export default TradingList;