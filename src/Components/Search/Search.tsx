import React, { useState } from 'react';
import { ArticleType } from '../../App';
import fetchFunctions from '../../fetchFunctions';
import './Search.css';

interface Props {
  setSearchResults: (value: { status: string; totalResults: number; articles: [ArticleType] }) => void;
  setSearchSubmited: (value: string) => void;
}

const Search = ({ setSearchResults, setSearchSubmited }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const fetching = fetchFunctions();

  //Submit search by pressing the enter while on input
  const keyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key === 'Enter' && inputValue) {
      setSearchSubmited(inputValue);
      const results = await fetching.byWordsInTitle(inputValue);
      setSearchResults(results);
      console.log(results);
    }
  };

  //Save the user's search in a state to use it to call the API
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  return (
    <div id="search-container">
      <input
        onKeyUp={keyUp}
        onChange={change}
        type="search"
        name="search"
        id="search-input"
        placeholder="Keywords in title..."
        aria-label="search"
      />
    </div>
  );
};

export default Search;
