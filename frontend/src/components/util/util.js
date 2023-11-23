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
  console.log(tags);
  return tags.constructor == String
    ? tags.split(",")
    : tags.join(`\xa0\xa0\xa0`);
};

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export {
  renderDates,
  renderPostsLimitedCharacters,
  renderPost,
  renderTags,
  quillModules,
  quillFormats,
};
