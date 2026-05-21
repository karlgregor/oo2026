import { LibraryManagement, Book, DVD } from "../library";

test("add book", () => {
    const lib = new LibraryManagement();

    lib.addItem(new Book("B1", "Test Book", "Author A", 2000, 100, "12345"));

    expect(lib.listItems().length).toBe(1);
    expect(lib.listItems()[0]).toBeInstanceOf(Book);
});

test("add dvd", () => {
    const lib = new LibraryManagement();

    lib.addItem(new DVD("D1", "Test DVD", "Director A", 2020, 120));

    expect(lib.listItems().length).toBe(1);
    expect(lib.listItems()[0]).toBeInstanceOf(DVD);
});