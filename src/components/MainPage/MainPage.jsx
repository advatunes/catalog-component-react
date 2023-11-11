import React, { useState, useEffect } from 'react';

import { catalogApi } from '../../utils/Api';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function MainPage() {
  const [rowData, setRowData] = useState([{ 11: 'pop', 22: '1' }]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'ID_GOOD', sortable: true, filter: true, width: '10%' },
    { headerName: 'Название', field: 'GOOD_NAME', sortable: true, filter: true, width: '100%' },
    { headerName: 'Упаковка', field: 'PACKAGING', sortable: true, filter: true, width: '10%' },
    {
      headerName: 'Кол-во (магазин)',
      field: 'KOL_GOOD_NETTO_SHOP',
      sortable: true,
      filter: true,
      width: '10%',
    },
    {
      headerName: 'Кол-во (склад)',
      field: 'KOL_GOOD_NETTO_SKLAD',
      sortable: true,
      filter: true,
      width: '10%',
    },
    {
      headerName: 'Кол-во (в пути)',
      field: 'KOL_GOOD_NETTO_WAY',
      sortable: true,
      filter: true,
      width: '10%',
    },
  ]);

  // function getGoods() {
  //   catalogApi
  //     .getCatalogInfo('911')
  //     .then((item) => console.log(item))
  //     .catch((error) => console.log(error));
  // }
  useEffect(() => {
    catalogApi
      .getCatalogInfo('911')
      .then((item) => setRowData(item.data.data1))
      .catch((error) => console.log(error));
  }, []);

  const handleCellClicked = (event) => {
    catalogApi
      .getGoodsInfo(event.value)
      .then((item) => console.log(item))
      .catch((error) => console.log(error));
  };

  return (
    <main className='content'>
      <div className='ag-theme-alpine' style={{ height: 500 }}>
        <h1 className='title'>Каталог</h1>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellClicked={handleCellClicked}
          domLayout='autoHeight'
          onGridSizeChanged={(params) => params.api.sizeColumnsToFit()}
        />
      </div>
    </main>
  );
}

export default MainPage;
