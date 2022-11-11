import { SyntheticEvent } from 'react';
import './Article.scss';

interface Props {
  data: {
    author: string | null;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string | null; name: string };
    title: string;
    url: string & Location;
    urlToImage: string;
  };
}

const Article = ({ data }: Props) => {
  //Changing the date format, EX: from 2022-02-01T23:36:00Z TO 23:36 01/02/2022
  const publishDate = data.publishedAt.substring(0, data.publishedAt.indexOf('T'));
  const publishYear = publishDate.slice(0, 4);
  const publishMonth = publishDate.slice(5, 7);
  const publishDay = publishDate.slice(8, 10);
  const publishHour = data.publishedAt.substring(data.publishedAt.indexOf('T') + 1, 16);

  const toOriginalPost = (url: string & Location) => {
    window.open(url, '_blank');
  };

  return (
    <article
      onClick={() => {
        toOriginalPost(data.url);
      }}
      className={data.urlToImage ? '' : 'imageless'}
    >
      <img id="article-img" src={data.urlToImage} alt="news" />
      <div id="details">
        <h2 id="title"> {data.title}</h2>
        <div id="author-date">
          <p id="author">by {data.author ? data.author : 'author unknown '} </p>
          <p id="date-published">{`${publishHour} ${publishDay}/${publishMonth}/${publishYear}`} </p>
        </div>
      </div>
    </article>
  );
};

export default Article;
