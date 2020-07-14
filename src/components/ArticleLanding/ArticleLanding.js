import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useRouteMatch } from "react-router-dom";
import { API_BASE_URL } from "../../support/constants";
import StringUtils from "../../support/stringUtils";
import ArticleBody from "./ArticleBody";

const ArticleLanding = () => {
  const match = useRouteMatch();
  const [article, setArticle] = useState({});
  console.log(match);
  useEffect(() => {
    fetch(`${API_BASE_URL}/post/${parseInt(match.params.id)}`)
      .then((res) => res.json())
      .then((json) => setArticle(json));
  }, [match.params.id]);
  const articlePresent = article.hasOwnProperty("id");
  const parsedBody = articlePresent ? JSON.parse(article.body) : [];
  return (
    <article>
      {articlePresent && (
        <>
          <Header
            title={article.title}
            imageUrl={article.image}
            estimatedTimeToRead={StringUtils.readingTime(parsedBody)}
          />
          <ArticleBody body={parsedBody} />
        </>
      )}
    </article>
  );
};

export default ArticleLanding;
