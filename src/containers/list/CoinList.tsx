'use client';

import { Grid } from "@/components/list/Grid";
import { Box } from "@mui/material";
import { GridColDef, GridEventListener } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LIST_URL = 'http://localhost:4000/coin/list'

interface Asset {
  id: number
  ticker: string
  symbol_id: string
  price: number
}

const CoinList = ({ searchTerm } : { searchTerm: string}) => {
  const router = useRouter()
  const [allAssets, setAllAssets] = useState<Asset[]>([])
  const [assets, setAssets] = useState<Asset[]>([])

  useEffect(() => {
    const getCoinList = async () => {
      const response = await fetch(LIST_URL)
      const joResp = await response.json()
      console.log('joResp', joResp)
      setAssets(joResp.list)
      setAllAssets(joResp.list)
    }
    getCoinList()
  }, [])

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const filteredAssets = assets.filter((asset: Asset) => asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()))
      setAssets(filteredAssets)
    } else {
      setAssets(allAssets)
    }
  }, [assets, allAssets, searchTerm])

  const headers: GridColDef[] = [
    { field: 'id', headerName: 'id', flex: 1},
    { field: 'ticker', headerName: 'ticker', flex: 4 },
    { field: 'symbol_id', headerName: 'symbol', flex: 3 },
    { field: 'price', headerName: 'price', flex: 2, 
      renderCell(params) {
        return (
          <Box>
            {params.value.toLocaleString()}
          </Box>
        )
      },
    }
  ]

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    router.push(`/view/${params.row.id}`)
  }

  return (
    <Box>
      <Grid headers={headers} rows={assets} onRowClick={handleRowClick} />
    </Box>
  )
}

export default CoinList;