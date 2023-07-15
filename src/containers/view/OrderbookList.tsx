'use client';

import { Stack, Box, List, ListItem, ListItemText, ListItemIcon, Typography } from "@mui/material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Divider from '@mui/material/Divider';
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const ORDERBOOK_BUY_URL = 'http://localhost:4000/orderbook/buy'
const ORDERBOOK_SELL_URL = 'http://localhost:4000/orderbook/sell'

interface OrderbookData {
  id: number
  user_id: string
  amount: number
  remain_amt: number
  price: number
  ordered_at: string
}

const OrderbookList = () => {
  const [buyList, setBuyList] = useState<OrderbookData[]>([])
  const [sellList, setSellList] = useState<OrderbookData[]>([])

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(ORDERBOOK_BUY_URL)
      const joResp = await response.json()

      if(joResp.flag) {
        setBuyList(joResp.data)
      }

      const response2 = await fetch(ORDERBOOK_SELL_URL)
      const joResp2 = await response2.json()

      if(joResp2.flag) {
        setSellList(joResp2.data)
      }
    }
    fetchList()
  }, [])

  const OrderbookListItem = ({ item }: { item: OrderbookData }) => {
    return (
      <Box>
        <ListItem>
          <ListItemIcon>
            <AttachMoneyOutlinedIcon />
          </ListItemIcon>
          <ListItemText>{item.price.toLocaleString()} 원</ListItemText>
          <ListItemIcon>
            <ArrowForwardOutlinedIcon />
          </ListItemIcon>
          <ListItemText>{item.remain_amt.toLocaleString()} 개</ListItemText>
        </ListItem>
        <Divider />
      </Box>
    )
  }

  return (
    <Stack direction='row' spacing={2}>
      <Box>
        <Box textAlign='right'><Typography variant='h5'>Sell</Typography></Box>
        <OrderList>
          {sellList.map((item, index) => (
            <OrderbookListItem key={index} item={item} />
          ))}
        </OrderList>
      </Box>
      <Box>
        <Box><Typography variant='h5'>Buy</Typography></Box>
        <OrderList>
          {buyList.map((item, index) => (
            <OrderbookListItem key={index} item={item} />
          ))}
        </OrderList>
      </Box>
    </Stack>
  )
}

const OrderList = styled(List)`
  width: 300px;
  height: 300px;
  border: 1px solid #b2b2b2;
  border-radius: 10px;
  overflow: auto;
`


export default OrderbookList;