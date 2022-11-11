import { useEffect, useRef, useState } from 'react';
import './App.css';
import ArticlesContainer from './Components/ArticlesContainer/ArticlesContainer';
import Filter from './Components/Filter/Filter';
import Pagination from './Components/Pagination/Pagination';
import Search from './Components/Search/Search';
import Sort from './Components/Sort/Sort';

export type ArticleType = {
  author: string | null;
  content: string;
  description: string;
  publishedAt: string;
  source: { id: string | null; name: string };
  title: string;
  url: string & Location;
  urlToImage: string;
};

interface Results {
  status: string;
  totalResults: number;
  articles: [ArticleType] | undefined;
}

let pageSize = 20;
function App() {
  const [searchResults, setSearchResults] = useState<Results>({ status: '', totalResults: 0, articles: undefined });
  const [searchSubmited, setSearchSubmited] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropFilter, setDropFilter] = useState(false);
  const [dropSort, setDropSort] = useState(false);
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  console.log(searchResults);

  useEffect(() => {
    const closeDropDowns = (e: any) => {
      //@ts-ignore
      if (filterRef.current && !filterRef.current.contains(e.target)) setDropFilter(false);
      //@ts-ignore
      if (sortRef.current && !sortRef.current.contains(e.target)) setDropSort(false);
    };

    document.body.addEventListener('click', closeDropDowns);

    return () => {
      document.body.removeEventListener('click', closeDropDowns);
    };
  }, []);

  return (
    <div className="App">
      <header>
        <Search setSearchResults={setSearchResults} setSearchSubmited={setSearchSubmited} />
        <div id="sort-filter">
          <Filter
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            dropFilter={dropFilter}
            setDropFilter={setDropFilter}
            ref={filterRef}
          />
          <Sort
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            dropSort={dropSort}
            setDropSort={setDropSort}
            ref={sortRef}
          />
        </div>
      </header>
      {searchResults && searchResults?.status === 'ok' ? (
        <Pagination
          onPageChange={(page) => {
            typeof page === 'string' ? (page = parseInt(page)) : (page = page);
            setCurrentPage(page);
          }}
          totalCount={searchResults.totalResults > 100 ? 100 : searchResults.totalResults}
          currentPage={currentPage}
          pageSize={pageSize}
          className="on-top"
        />
      ) : (
        <div id="no-news"> There are no news to show . </div>
      )}
      <ArticlesContainer
        pageSize={pageSize}
        currentPage={currentPage}
        searchResults={searchResults}
        searchSubmited={searchSubmited}
      />

      {searchResults && searchResults?.status !== 'error' ? (
        <Pagination
          onPageChange={(page) => {
            typeof page === 'string' ? (page = parseInt(page)) : (page = page);
            setCurrentPage(page);
          }}
          totalCount={searchResults.totalResults > 100 ? 100 : searchResults.totalResults}
          currentPage={currentPage}
          pageSize={pageSize}
          className=""
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
