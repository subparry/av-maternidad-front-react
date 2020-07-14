import React from "react";

class StringUtils {
  static truncateAt = (str, num) => {
    return str.slice(0, num).concat("...");
  };

  static unwrapRichTextArray = (textObjectsArray) =>
    textObjectsArray.map((obj) => this.unwrapTextObject(obj));

  // TODO: complete method
  static unwrapTextObject = (textObject) => {
    switch (textObject.type) {
      case "text":
        return <p className="article-text">{textObject.value}</p>;
      case "image":
        return <img src={textObject.value} className="article-image" />;
      case "quote":
        return <p className="article-quote">{textObject.value}</p>;
      default:
        return null;
    }
  };

  static unwrapRichTextArrayAsPlainText = (textObjectsArray) => {
    return textObjectsArray
      .map((obj) => {
        if (obj.type === "image") return "";
        return obj.value;
      })
      .join(" ");
  };

  static wordCount = (textObjectsArray) => {
    return this.unwrapRichTextArrayAsPlainText(textObjectsArray).split(" ")
      .length;
  };

  static wordCountToReadingTime = (count) => {
    // Average reading time (non technical) is 200-250 words/minute.
    // Since this blog can be somewhat technical, we'll use 200
    // for our calculations
    return `${Math.floor(parseInt(count) / 200)} min`;
  };

  static readingTime = (textObjectsArray) => {
    return this.wordCountToReadingTime(this.wordCount(textObjectsArray));
  };
}

export default StringUtils;
