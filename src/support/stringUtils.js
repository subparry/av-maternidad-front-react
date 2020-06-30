class StringUtils {
  static truncateAt = (str, num) => {
    return str.slice(0, num).concat("...");
  };
}

export default StringUtils;
