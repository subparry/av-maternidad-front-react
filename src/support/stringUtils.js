class StringUtils {
  static truncateAt = (str, num) => {
    return str.slice(0, num).concat("...");
  };

  static unwrapRichTextArray = (textObjectsArray) =>
    textObjectsArray.map((obj) => StringUtils.unwrapTextObject(obj));

  // TODO: complete method
  static unwrapTextObject = (textObject) => {
    switch (textObject.type) {
      case "text":
        return null;
      case "image":
        return null;
      case "quote":
        return null;
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
}

export default StringUtils;
