import DOMPurify from "isomorphic-dompurify";

const renderHtml = (htmlContent: string): { __html: string } => ({
    __html: DOMPurify.sanitize(htmlContent)
});

export default renderHtml;