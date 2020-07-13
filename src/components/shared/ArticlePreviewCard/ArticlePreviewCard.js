import React from "react";
import "./articlepreviewcard.scss";
import StringUtils from "../../../support/stringUtils";

const ArticlePreviewCard = ({
  thumbnailImg,
  title = "default title",
  body,
}) => {
  const plainTextBody = StringUtils.unwrapRichTextArrayAsPlainText(
    JSON.parse(body)
  );
  const truncatedBody = StringUtils.truncateAt(plainTextBody, 160);
  return (
    <div className="apcard-container" data-testid="article-preview-card">
      {thumbnailImg && <img src={thumbnailImg} />}
      <div className="apcard-contents">
        <h2 className="apcard-title">{title}</h2>
        <div className="apcard-body">
          <p>{truncatedBody}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreviewCard;
