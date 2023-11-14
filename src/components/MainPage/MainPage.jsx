import React, { useState, useEffect } from 'react';

import { catalogApi } from '../../utils/Api';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import SearchForm from '../SearchForm/SearchForm';

function MainPage() {
  const [rowData, setRowData] = useState([
    {
      ID_GOOD: 1,
      GOOD_NAME: 'Product A',
      PACKAGING: 'Box',
      KOL_GOOD_NETTO_SHOP: 10,
      KOL_GOOD_NETTO_SKLAD: 20,
      KOL_GOOD_NETTO_WAY: 5,
    },
    {
      ID_GOOD: 2,
      GOOD_NAME: 'Product B',
      PACKAGING: 'Bottle',
      KOL_GOOD_NETTO_SHOP: 15,
      KOL_GOOD_NETTO_SKLAD: 25,
      KOL_GOOD_NETTO_WAY: 8,
    },
    {
      ID_GOOD: 3,
      GOOD_NAME: 'Product C',
      PACKAGING: 'Pack',
      KOL_GOOD_NETTO_SHOP: 12,
      KOL_GOOD_NETTO_SKLAD: 18,
      KOL_GOOD_NETTO_WAY: 3,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [allImageGoods, setAllImageGoods] = useState('');

  const [loading, setLoading] = useState(false);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'ID_GOOD', sortable: true, filter: true, width: '15%' },
    { headerName: 'Название', field: 'GOOD_NAME', sortable: true, filter: true, width: '90%' },
    { headerName: 'Упаковка', field: 'PACKAGING', sortable: true, filter: true, width: '20%' },
    {
      headerName: 'Кол-во (магазин)',
      field: 'KOL_GOOD_NETTO_SHOP',
      sortable: true,
      filter: true,
      width: '20%',
    },
    {
      headerName: 'Кол-во (склад)',
      field: 'KOL_GOOD_NETTO_SKLAD',
      sortable: true,
      filter: true,
      width: '20%',
    },
    {
      headerName: 'Кол-во (в пути)',
      field: 'KOL_GOOD_NETTO_WAY',
      sortable: true,
      filter: true,
      width: '20%',
    },
  ]);

  const handleSearch = (searchValue) => {
    setLoading(true);
    catalogApi
      .getCatalogInfo(searchValue)
      .then((item) => setRowData(item.data.data1))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCellClicked = (event) => {
    setLoading(true);
    setCurrentIndex(0);
    catalogApi
      .getGoodsInfo(event.data.ID_GOOD)
      .then((item) => {
        setAllImageGoods(item);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
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
        {allImageGoods.length !== 0 ? (
          <div className='image-section__content'>
            <img
              className='image-section__image'
              src={`data:image/png;base64, ${allImageGoods[currentIndex]}`}
              alt=''
            />
            <div className='image-section__controls'>
              <button className='image-section__button' onClick={prevImage}>
                &#8592;
              </button>
              <p className='image-section__info'>
                Изображение {currentIndex + 1} из {allImageGoods.length}
              </p>
              <button className='image-section__button' onClick={nextImage}>
                &#8594;
              </button>
            </div>
          </div>
        ) : (
          <p className='image-section__message'>Нет изображения</p>
        )}
      </div>

      <div className='grid-section'>
        <SearchForm
          onSearch={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          loading={loading}
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
