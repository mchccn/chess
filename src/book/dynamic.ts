const OpeningBook: Record<string, number[]> = {};

// since the book is 19 megabytes, we should load it in the background
import("./book.js").then((book) => {
    Object.assign(OpeningBook, book.default);

    console.info("opening book dynamically loaded");
});

export default OpeningBook;
