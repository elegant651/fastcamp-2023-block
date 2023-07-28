'use client';

import PairInput from "@/components/view/PairInput";
import styled from "@emotion/styled";
import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { useSnackbar } from "notistack";

const OrderForm = () => {
  const ENDPOINT = 'http://localhost:4000'
  const [isBuy, setIsBuy] = useState(true)
  const [loading, setLoading] = useState(false)
  const [orderAmount, setOrderAmount] = useState(0)
  const [orderPrice, setOrderPrice] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  const initData = () => {
    setOrderAmount(0)
    setOrderPrice(0)
  }

  const onConfirm = async () => {
    try {
      setLoading(true)
      const url = isBuy ? `${ENDPOINT}/order/buy` : `${ENDPOINT}/order/sell`

      const data = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'Suzan', price: orderPrice, amount: orderAmount })
      })

      console.log('data', data)
      if (data) {
        setLoading(false)
        initData()
        enqueueSnackbar('order placed!', { variant: 'success' })
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      enqueueSnackbar('order failed!', { variant: 'error' })
    }
  }

  const invalidMsg = () => {
    if (!orderAmount || orderAmount <= 0) {
      return '주문 수량은 0보다 커야 합니다.'
    }
    if (!orderPrice || orderPrice <= 0) {
      return '주문 가격은 0보다 커야 합니다.'
    }
    return ''
  }

  const isValid = invalidMsg() === '' && !loading

  return (
    <Box width='320px' border='1px solid #b2b2b2' padding='10px'>
      <ButtonGroup>
        <Button disabled={isBuy} onClick={() => setIsBuy(true)}>매수</Button>
        <Button disabled={!isBuy} onClick={() => setIsBuy(false)}>매도</Button>
      </ButtonGroup>
      <Box>
        <PairInput 
          unit='BTC' 
          value={orderAmount} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { 
            const amount = parseFloat(event.currentTarget.value)
            setOrderAmount(amount)
          }} />
        <PairInput 
          unit='원' 
          value={orderPrice} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => { 
            const price = parseFloat(event.currentTarget.value)
            setOrderPrice(price)
          }} />
        <PairInput
          unit='원'
          value={orderAmount * orderPrice}
          isDisabled
        />
          
        <Box>
          <ActionButton variant='contained' onClick={onConfirm} disabled={!isValid}>{isBuy ? '매수하기' : '매도하기'}</ActionButton>
        </Box>
      </Box>
    </Box>
  )
}

const ActionButton = styled(Button)`
  width: 100%;
  height: 52px;
  background: #468499;
  border-radius: 10px;
  margin-top: 10px;
`

export default OrderForm;