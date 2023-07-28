'use client'

import styled from "@emotion/styled"
import { Box, FormControl, Stack, Typography } from "@mui/material"

interface Props {
  unit: string | null
  value: number
  isDisabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PairInput: React.FC<Props> = ({ unit, value, isDisabled = false, onChange }) => {
  return (
    <Box>
      <FormControl sx={{ width: '100%' }}>
        <FormStack direction='row' alignItems='center' justifyContent='space-between' sx={isDisabled ? {background: '#333'} : {}}>
          <Box>
            <InputAmount type="number" placeholder="0.0" value={value} onChange={onChange} disabled={isDisabled}
              style={isDisabled ? { border: '0px' } : {}} />
          </Box>

          <UnitBox>
            <Typography variant='h6'>{unit}</Typography>
          </UnitBox>
        </FormStack>
      </FormControl>
    </Box>
  )
}

const FormStack = styled(Stack)`
  width: 100%;
  height: 84px;
  padding: 12px;
  border: 1px solid #b1b1b1;
  border-radius: 10px;
  background-color: #000;
`
const UnitBox = styled(Box)`
  color: #fff;
  padding: 3px 10px;
`
const InputAmount = styled('input')`
  width: 160px;
  border: 1px solid #b1b1b1;;
  background: transparent;
  font-size: 20px;
  font-weight: 500;
  color: #b3b3b3;
  padding: 5px;
`

export default PairInput