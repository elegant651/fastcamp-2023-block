'use client';

import Chart from "@/components/view/Chart";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ChartGraph = ({ assetId, tickerSymbol }: { assetId: number, tickerSymbol: string }) => {
  const [chartData, setChartData] = useState([
    { price: 5, volume: 0 }, { price: 10, volume: 0 }, { price: 22, volume: 0 }
  ])

  useEffect(() => {
    const getHistory = async () => {
      const history_url = `http://localhost:4000/coin/history/${tickerSymbol}/1DAY`
      const response = await fetch(history_url)
      const joResp = await response.json()
      console.log(joResp)
      const arrValues = joResp.data.map((item: any) => {
        return {
          price: item.price_close,
          volume: item.volume_traded
        }
      })
      setChartData(arrValues)
    }
    getHistory()
  }, [assetId, tickerSymbol])

  return (
    <Box>
      <Chart data={chartData} />
    </Box>
  )
}

export default ChartGraph;