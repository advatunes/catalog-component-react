import React, { useState, useEffect } from 'react';

import { catalogApi } from '../../utils/Api';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function MainPage() {
  const [rowData, setRowData] = useState([{ 11: 'pop', 22: '1' }]);
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'ID_GOOD' },
    { headerName: 'Название', field: 'GOOD_NAME' },
    { headerName: 'Упаковка', field: 'PACKAGING' },
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

  return (
    <main className='content'>
      <div className='ag-theme-alpine' style={{ height: 500 }}>
        <h1 className='title'>Каталог</h1>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </main>
  );
}

export default MainPage;
