import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

type LineChartProps = {
  data: any
  maxY: number
  minY: number
}

const Chart: React.FC<LineChartProps> = ({data, maxY, minY}) => {

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {

      return (
        <Card sx={{ padding: '10px' }}>
          <Box color='#8884d8'>{`$${payload[0].value.toLocaleString()}`}</Box>
          <Box color={'#c30b00'}>{payload[1].value.toLocaleString()}</Box>
        </Card>
      );
    }
  
    return null;
  };

  return (
    <Wrapper>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c30b00" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#c30b00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <YAxis 
            type="number"
            axisLine={false}
            color="#9e9e9e"
            fontSize="10px"
          />
          <CartesianGrid strokeDasharray="6 6" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="volume" stroke="#f0e68c" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>    
  )
}

const Wrapper = styled(Card)`
  padding: 10px;
  width: 700px;
  height: 300px;
`

export default Chart;