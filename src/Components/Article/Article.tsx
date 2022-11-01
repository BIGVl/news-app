import './Article.css';

interface Props {
  data: {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string | null; name: string };
    title: string;
    url: string;
    urlToImage: string;
  };
}

const Article = ({ data }: Props) => {
  console.log(data);
  return (
    <article>
      <img src={data.urlToImage} alt="news" />
      <p> {data.title}</p>
    </article>
  );
};

export default Article;
