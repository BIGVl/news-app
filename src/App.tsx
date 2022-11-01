import { useEffect, useState } from 'react';
import './App.css';
import ArticlesContainer from './Components/ArticlesContainer/ArticlesContainer';
import Search from './Components/Search/Search';

interface Results {
  status: string;
  totalResults: number;
  articles: any[];
}

function App() {
  const [searchResults, setSearchResults] = useState<Results>();

  useEffect(() => {
    console.log(searchResults?.articles);
  }, [searchResults]);

  return (
    <div className="App">
      <header>
        <Search setSearchResults={setSearchResults} />
      </header>
      <ArticlesContainer articles={searchResults?.articles} />
    </div>
  );
}

export default App;
