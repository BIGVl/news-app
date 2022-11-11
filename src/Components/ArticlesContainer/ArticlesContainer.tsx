import { ArticleType } from '../../App';
import Article from '../Article/Article';
import './ArticlesContainer.css';

interface Props {
  searchResults: { status: string; totalResults: number; articles: [ArticleType] | undefined };
  searchSubmited: string | undefined;
  pageSize: number;
  currentPage: number;
}

const ArticlesContainer = ({ searchResults, pageSize, currentPage }: Props) => {
  return (
    <main>
      {searchResults?.articles?.map((article, i) => {
        if (i + 1 <= pageSize * currentPage && i + 1 > pageSize * currentPage - pageSize)
          return <Article key={i} data={article} />;
      })}
    </main>
  );
};

export default ArticlesContainer;
