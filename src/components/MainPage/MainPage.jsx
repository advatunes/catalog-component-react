import React, { useState, useEffect } from 'react';

import { catalogApi } from '../../utils/Api';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import SearchForm from '../SearchForm/SearchForm';

function MainPage() {
  const [rowData, setRowData] = useState([{ 11: 'pop', 22: '1' }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [allImageGoods, setAllImageGoods] = useState('');

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

  const handleSearch = (searchValue) => {
    catalogApi
      .getCatalogInfo(searchValue)
      .then((item) => setRowData(item.data.data1))
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   catalogApi
  //     .getCatalogInfo('911')
  //     .then((item) => setRowData(item.data.data1))
  //     .catch((error) => console.log(error));
  // }, []);

  const handleCellClicked = (event) => {
    catalogApi
      .getGoodsInfo(event.data.ID_GOOD)
      .then((item) => {
        setAllImageGoods(item);
      })
      .catch((error) => console.log(error));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allImageGoods.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? allImageGoods.length - 1 : prevIndex - 1));
  };

  return (
    <main className='content'>
      <div className='image-section'>
        <p>Изображение</p>
        <img
          className='image'
          src={`data:image/png;base64, ${allImageGoods[currentIndex]}`}
          alt=''
        />
        <p>Изображений {allImageGoods.length}</p>
        <button className='image-button' onClick={prevImage}>
          Влево
        </button>
        <button className='image-button' onClick={nextImage}>
          Вправо
        </button>
      </div>

      <div className='grid-section'>
        <SearchForm
          onSearch={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
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
