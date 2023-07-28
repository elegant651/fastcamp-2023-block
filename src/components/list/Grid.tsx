import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";

interface GridProps {
  headers: GridColDef[],
  rows: any[]
  onRowClick?: GridEventListener<'rowClick'>
}

export const Grid: React.FC<GridProps> = ({ headers, rows, onRowClick }) => (
  <DataGrid
    sx={{
      border: '1px solid #b1b1b1',
      '& .MuiDataGrid-columnHeaderTitle': {
        color: '#b1b1b1'
      }
    }}
    columns={headers}
    rows={rows}
    onRowClick={onRowClick}
    hideFooter
    disableColumnMenu
    disableColumnSelector
    disableColumnFilter
    rowHeight={52}
    rowCount={20}
    autoHeight
  />
)