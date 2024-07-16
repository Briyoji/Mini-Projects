import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

function NewsContainer(props) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  // const [numPages, setNumPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // let mounted = false;
  
  const fetchData = async (pgNum) => {
    props.setProgress(10);
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=4960c192a27040afa56db528508fbf04&page=${pgNum}&pageSize=${props.pageSize}`;
    
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    
    setArticles(articles.concat(parsedData.articles))
    // setNumPages(Math.ceil(parsedData.totalResults / props.pageSize))
    setTotalResults(parsedData.totalResults)
    
    props.setProgress(100);
  }
  
  const fetchMoreData = async () => {
    await fetchData(page + 1);
    setPage(page + 1)
  };
  
  useEffect(() => {
    fetchData(page);
    document.title = props.category?`NewsMonkey - ${props.category.toUpperCase()}`:"NewsMonkey";
  }, [])

  return (
    <div className="news-container-wrapper container my-5">
      <h2 className="news-type-title text-center">Top {props.category} News</h2>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="my-1 news-container">
          {articles.map((article) => {
            return <NewsItem key={article.url} article={article} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default NewsContainer;
