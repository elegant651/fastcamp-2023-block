import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

type LineChartProps = {
  data: any
}

const Chart: React.FC<LineChartProps> = ({data}) => {

  // const data = [
  //   {
  //     "name": "Page A",
  //     "uv": 4000,
  //     "pv": 2400,
  //     "amt": 2400
  //   },
  //   {
  //     "name": "Page B",
  //     "uv": 3000,
  //     "pv": 1398,
  //     "amt": 2210
  //   },
  //   {
  //     "name": "Page C",
  //     "uv": 2000,
  //     "pv": 9800,
  //     "amt": 2290
  //   },
  //   {
  //     "name": "Page D",
  //     "uv": 2780,
  //     "pv": 3908,
  //     "amt": 2000
  //   },
  //   {
  //     "name": "Page E",
  //     "uv": 1890,
  //     "pv": 4800,
  //     "amt": 2181
  //   },
  //   {
  //     "name": "Page F",
  //     "uv": 2390,
  //     "pv": 3800,
  //     "amt": 2500
  //   },
  //   {
  //     "name": "Page G",
  //     "uv": 3490,
  //     "pv": 4300,
  //     "amt": 2100
  //   }
  // ]

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
  height: 500px;
`

export default Chart;