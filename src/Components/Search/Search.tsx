import React, { useState } from 'react';
import fetchFunctions from '../../fetchFunctions';
import './Search.css';

interface Props {
  setSearchResults: (value: { status: string; totalResults: number; articles: any[] }) => void;
}

const Search = ({ setSearchResults }: Props) => {
  const fetching = fetchFunctions();
  const [searchInput, setSearchInput] = useState<string>();

  //Submit search by pressing the enter while on input
  const keyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && searchInput) {
      const results = await fetching.byWordsInTitle(searchInput);
      setSearchResults(results);
    }
  };

  //Save the user's search in a state to use it to call the API
  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput((e.target as HTMLInputElement).value);
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
