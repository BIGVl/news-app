import { useEffect } from 'react';
import fetchFunctions from '../../fetchFunctions';
import './Search.css';

interface Results {
  status: string;
  totalResults: number;
  articles: any[];
}

interface Props {
  setSearchResults: (value: Results) => void;
}

const Search = ({ setSearchResults }: Props) => {
  const fetching = fetchFunctions();

  useEffect(() => {
    fetching.byWordsInTitle('trump');
  });

  return (
    <div id="search-container">
      <input
        type="search"
        name="search"
        id="search-input"
        placeholder="Search news from over 80.000 news sources"
        aria-label="search"
      />
    </div>
  );
};

export default Search;
