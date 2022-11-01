import Article from '../Article/Article';
import './ArticlesContainer.css';

interface Props {
  articles: any[] | undefined;
}

const ArticlesContainer = ({ articles }: Props) => {
  return (
    <main>
      {articles?.map((article) => {
        return <Article data={article} />;
      })}
    </main>
  );
};

export default ArticlesContainer;
