import React from "react";
import StringUtils from "../../support/stringUtils";

const ArticleBody = ({ body }) => {
  return (
    <section className="article-body">
      {StringUtils.unwrapRichTextArray(body)}
    </section>
  );
};

export default ArticleBody;
