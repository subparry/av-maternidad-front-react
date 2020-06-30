import React from "react";
import "./articlepreviewcard.scss";
import StringUtils from "../../../support/stringUtils";

const ArticlePreviewCard = ({
  thumbnailImg = "https://cdnuploads.aa.com.tr/uploads/Contents/2020/05/14/thumbs_b_c_88bedbc66bb57f0e884555e8250ae5f9.jpg?v=140708",
  title = "default title",
  body = `The blur radius (required), if set to 0 the shadow will be sharp, the higher the number, the more blurred it will be, and the further out the shadow will extend. For instance a shadow with 5px of horizontal offset that also has a 5px blur radius will be 10px of total shadow.
  The spread radius (optional), positive values increase the size of the shadow, negative values decrease the size. Default is 0 (the shadow is same size as blur)`,
}) => {
  const truncatedBody = StringUtils.truncateAt(body, 160);
  return (
    <div className="apcard-container" data-testid="article-preview-card">
      <img src={thumbnailImg} />
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
