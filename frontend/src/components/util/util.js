import DOMPurify from "dompurify";

const renderDates = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // timeZoneName: "short",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};

const renderPostsLimitedCharacters = (postContent) => {
  // Get the first 800 characters of a post.
  if (postContent.length >= 800) {
    return DOMPurify.sanitize(postContent.substring(0, 800) + "...");
  }

  return postContent;
};

const renderPost = (postContent) => {
  return DOMPurify.sanitize(postContent);
};

const renderTags = (tags) => {
  // \xa0 - it is a NO-BREAK SPACE char.
  return tags.join(`\xa0\xa0\xa0`);
};

export { renderDates, renderPostsLimitedCharacters, renderPost, renderTags };
