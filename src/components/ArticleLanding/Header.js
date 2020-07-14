/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import ArticleAuthorCard from "./ArticleAuthorCard";

const Header = ({ title, subtitle, imageUrl, estimatedTimeToRead }) => {
  return (
    <section className="article-header">
      <h1 className="article-title">{title}</h1>
      {subtitle && <h3>{subtitle}</h3>}
      <ArticleAuthorCard estimatedTimeToRead={estimatedTimeToRead} />
      <img
        src={imageUrl}
        alt="article main image"
        className="article-main-image"
      />
    </section>
  );
};

export default Header;
