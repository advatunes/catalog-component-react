import React from 'react';
import { useState } from 'react';

function SearchForm({ onSearch, searchValue, setSearchValue, onShortFilms, shortFilms }) {
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchValue);
    // if (searchValue.trim() !== '') {
    //   setErrorMessage('');
    //   onSearch(searchValue);
    // } else {
    //   setErrorMessage('Нужно ввести ключевое слово');
    // }
  }

  function handleSearchChange(e) {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }


  return (
    <section className='search-form'>
      <form className='search-form__wrap' onSubmit={handleSubmit}>
        <input
          className='search-form__input'
          type='text'
          name='search'
          placeholder='Поиск...'
          value={searchValue}
          onChange={handleSearchChange}
        />

        <button className='search-form__button' type='submit'>
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
