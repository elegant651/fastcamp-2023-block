'use client';

import Chart from "@/components/view/Chart";
import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

enum FilterTimeMap {
  '1HRS' = '1H',
  '1DAY' = '1D',
  '3DAY' = '3D',
  '1MTH' = '1M',
}
type FilterTime = keyof typeof FilterTimeMap

const ChartGraph = ({ assetId, tickerSymbol }: { assetId: number, tickerSymbol: string }) => {
  const [chartData, setChartData] = useState([
    { price: 5, volume: 0 }, { price: 10, volume: 0 }, { price: 22, volume: 0 }
  ])
  const [filterTime, setFilterTime] = useState<FilterTime>('1DAY')
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(0)

  useEffect(() => {
    const getHistory = async () => {
      const history_url = `http://localhost:4000/coin/history/${tickerSymbol}/${filterTime}`
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

      const arrPrices = arrValues.map((item: any) => item.price)
      setMaxValue(Math.floor(Math.max(...arrPrices)))
      setMinValue(Math.floor(Math.min(...arrPrices)))
    }
    getHistory()
  }, [assetId, tickerSymbol, filterTime])

  const handleFilterChange = (event: React.SyntheticEvent, newValue: FilterTime) => {
    setFilterTime(newValue)
  }

  return (
    <Box>
      <Tabs onChange={handleFilterChange} value={filterTime}>
        {Object.keys(FilterTimeMap).map((key) => (
          <Tab key={key} label={FilterTimeMap[key as FilterTime]} value={key} />
        ))}
      </Tabs>

      <Chart data={chartData} minY={minValue} maxY={maxValue} />
    </Box>
  )
}

export default ChartGraph;