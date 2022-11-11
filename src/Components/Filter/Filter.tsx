import React, { forwardRef, useState } from 'react';
import { ArticleType } from '../../App';
import filterSVG from '../../assets/filter.svg';
import './Filter.css';

interface Props {
  setSearchResults: (value: { status: string; totalResults: number; articles: [ArticleType] }) => void;
  searchResults: { status: string; totalResults: number; articles: [ArticleType] | undefined };
  dropFilter: boolean;
  setDropFilter: (value: boolean) => void;
}

type Dates = {
  from: string;
  to: string;
};

const Filter = forwardRef<HTMLDivElement, Props>(({ setSearchResults, searchResults, dropFilter, setDropFilter }, ref) => {
  const [dates, setDates] = useState({ from: '', to: '' });
  const copyResults = { ...searchResults };

  const change = (e: any) => {
    setDates((prev: Dates) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const filterByDate = (e: any) => {
    //@ts-ignore
    copyResults.articles = copyResults.articles?.filter((article) => {
      return new Date(article.publishedAt) >= new Date(dates.from) && new Date(article.publishedAt) <= new Date(dates.to);
    });
  };

  return (
    <div id="filter-container" ref={ref}>
      <img
        id="filter-icon"
        src={filterSVG}
        alt="filter news"
        onClick={() => {
          setDropFilter(!dropFilter);
        }}
      />
      {dropFilter ? (
        <div id="filter-menu">
          <label htmlFor="from">
            From :
            <input type="date" name="from" id="from" onChange={change} />
          </label>
          <label htmlFor="to">
            To :
            <input type="date" name="to" id="to" onChange={change} />
          </label>
          <button className="filter" onClick={filterByDate}>
            Filter
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default Filter;
