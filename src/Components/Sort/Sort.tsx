import React, { forwardRef } from 'react';
import { ArticleType } from '../../App';
import sortSvg from '../../assets/sort.svg';
import './Sort.css';

interface Props {
  setSearchResults: (value: { status: string; totalResults: number; articles: [ArticleType] | undefined }) => void;
  searchResults: {
    status: string;
    totalResults: number;
    articles: [ArticleType] | undefined;
  };
  dropSort: boolean;
  setDropSort: (value: boolean) => void;
}

const Sort = forwardRef<HTMLDivElement, Props>(({ setSearchResults, searchResults, dropSort, setDropSort }, ref) => {
  const copyResults = { ...searchResults };
  const dropMenu = () => {
    setDropSort(!dropSort);
  };

  const sortByDate = (e: any) => {
    if (searchResults.articles) {
      if (e.target.getAttribute('data-sort') === 'oldest') {
        //  @ts-ignore
        copyResults.articles?.sort((a, b) => {
          if (a && b) {
            const dateA = a.publishedAt.toLowerCase();
            const dateB = b.publishedAt.toLowerCase();

            if (dateA < dateB) {
              return -1;
            } else if (dateB < dateA) {
              return 1;
            }
            return 0;
          }
        });

        setSearchResults(copyResults);
      } else if (e.target.getAttribute('data-sort') === 'newest') {
        //  @ts-ignore

        copyResults.articles?.sort((a, b) => {
          if (a && b) {
            const dateA = a.publishedAt.toLowerCase();

            const dateB = b.publishedAt.toLowerCase();

            if (dateA < dateB) {
              return 1;
            } else if (dateB < dateA) {
              return -1;
            }

            return 0;
          }
        });

        setSearchResults(copyResults);
      }
    }
  };

  return (
    <div id="sort-container" ref={ref}>
      <img id="sort-icon" src={sortSvg} alt="sort the news" onClick={dropMenu} />
      {dropSort ? (
        <div id="sort-menu">
          <div id="oldest" data-sort="oldest" onClick={sortByDate}>
            Oldest
          </div>
          <div id="separator"></div>
          <div id="newest" data-sort="newest" onClick={sortByDate}>
            Newest
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default Sort;
