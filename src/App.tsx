import { useState } from 'react';
import './App.css';
import Search from './Components/Search/Search';

interface Results {
  status: string;
  totalResults: number;
  articles: any[];
}

function App() {
  const [searchResults, setSearchResults] = useState<Results>();

  return (
    <div className="App">
      <Search setSearchResults={setSearchResults} />
    </div>
  );
}

export default App;
