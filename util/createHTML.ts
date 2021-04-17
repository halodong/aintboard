import DOMPurify from "dompurify";

export const createHTML = (html: string) => {
  return {
    __html: DOMPurify.sanitize(html),
  };
};

export const createHTMLExcerpt = (html: string) => {
  const sanitizedHTML = DOMPurify.sanitize(html).substring(0, 300);

  return {
    __html: sanitizedHTML,
  };
};
