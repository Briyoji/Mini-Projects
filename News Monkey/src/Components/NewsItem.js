import React from "react";

function NewsItem(props) {

  let { article } = props;

  return (
    <div className="card mx-2 my-3">
      <img src={article.urlToImage} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description}</p>
        <div className="article-details">
          <small className="text-body-secondary">
            By {article.author ? article.author : "Unknown"} <br /> on{" "}
            {new Date(article.publishedAt).toUTCString()}
          </small>
          <a
            href={article.url}
            rel="noreferrer"
            target="_blank"
            className="btn btn-primary btn-sm btn-read-more my-1"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
