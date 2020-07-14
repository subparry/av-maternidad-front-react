import React from "react";

const ArticleAuthorCard = ({ estimatedTimeToRead }) => {
  return (
    <div>
      <img
        src="https://testing-playground.com/36-production.4b9d1641.png"
        alt="article-author"
      />
      <p>Andrea Vargas</p>
      <p>Tiempo estimado de lectura: {estimatedTimeToRead}</p>
    </div>
  );
};

export default ArticleAuthorCard;
