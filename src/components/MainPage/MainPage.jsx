import React from 'react';

import { catalogApi } from '../../utils/Api';


function MainPage() {
  function getGoods() {
    catalogApi
      .getCatalogInfo("911")
      .then((item) => console.log(item))
      .catch((error) => console.log(error));
  }

  return (
    <main className='content'>
      <h1 className='title'>Каталог</h1>
      <button onClick={getGoods}>жми</button>
    </main>
  );
}

export default MainPage;
