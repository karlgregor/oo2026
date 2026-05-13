class LibraryItem {
    id: string;
    title: string;
    author: string;
    year: number;

    constructor(id: string, title: string, author: string, year: number) {
        if (id.trim() === "") throw new Error("ID cannot be empty")
        
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }

    getId(): string {return this.id}
    getTitle(): string {return this.title}
    getAuthor(): string {return this.author}
    getYear(): number {return this.year}
    getSummary(): string {return `[Item] ${this.title}`}

}

class Book extends LibraryItem {
    pages: number;
    ISBN: string;

    constructor(id: string, title: string, author: string, year: number, pages: number, ISBN: string) {
        super(id, title, author, year)
        
        if (pages <= 0) throw new Error("Pages must be positive")

        this.pages = pages;
        this.ISBN = ISBN;
    }

    getSummary(): string {
        return `[Book] ${this.title} by ${this.author}, ${this.year}, ${this.pages} pages, ISBN: ${this.ISBN}`;
    }
}

class DVD extends LibraryItem {
    duration: number;

    constructor(id: string, title: string, author: string, year: number, duration: number) {
        super(id, title, author, year)
        
        this.duration = duration;
    }

    getSummary(): string {
        return `[DVD] ${this.title} by ${this.author}, ${this.year}, ${this.duration} min`;
    }
}

class LibraryManagement {
    private items: LibraryItem[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    addItem(item: LibraryItem): void {
        this.items.push(item);
        this.saveToLocalStorage();
    }

    removeItem(id: string): boolean {
        const index = this.items.findIndex(item => item.getId() === id);

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    }

    listItems(): LibraryItem[] {
        return this.items;
    }

    printItems(): void {
        for (const item of this.items) {
            console.log(item.getSummary());
        }
    }

    exportJson(): string {
    const data = this.items.map(item => {
        if (item instanceof Book) {
            return {
                type: "book",
                id: item.id,
                title: item.title,
                author: item.author,
                year: item.year,
                pages: item.pages,
                ISBN: item.ISBN
            };
        }

        if (item instanceof DVD) {
            return {
                type: "dvd",
                id: item.id,
                title: item.title,
                author: item.author,
                year: item.year,
                duration: item.duration
            };
        }
    });

    return JSON.stringify(data, null, 2);
}

    importJson(json: string): void {
        try {
            const data = JSON.parse(json);

            if (!Array.isArray(data)) {
                throw new Error("JSON must contain an array");
            }

            this.items = [];

            for (const item of data) {
                if (item.type === "book") {
                    this.items.push(
                        new Book(item.id, item.title, item.author, item.year, item.pages, item.ISBN)
                    );
                } else if (item.type === "dvd") {
                    this.items.push(
                        new DVD(item.id, item.title, item.author, item.year, item.duration)
                    );
                }
            }

            this.saveToLocalStorage();
        } catch (error) {
            console.log("Invalid JSON file");
        }
    }

    importText(text: string): void {
    try {
        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(line => line !== "");

        this.items = [];

        for (const line of lines) {
            const parts = line.split("|");

            const type = parts[0];

            if (type === "BOOK") {
                const id = parts[1];
                const title = parts[2];
                const author = parts[3];
                const year = Number(parts[4]);
                const pages = Number(parts[5]);
                const ISBN = parts[6];

                this.items.push(
                    new Book(id, title, author, year, pages, ISBN)
                );
            }

            if (type === "DVD") {
                const id = parts[1];
                const title = parts[2];
                const author = parts[3];
                const year = Number(parts[4]);
                const duration = Number(parts[5]);

                this.items.push(
                    new DVD(id, title, author, year, duration)
                );
            }
        }

        this.saveToLocalStorage();
    } catch (error) {
        console.log("Invalid text import");
    }
}

    private saveToLocalStorage(): void {
        const data = this.items.map(item => {
            if (item instanceof Book) {
                return {
                    type: "book",
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    year: item.year,
                    pages: item.pages,
                    ISBN: item.ISBN
                };
            }

            if (item instanceof DVD) {
                return {
                    type: "dvd",
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    year: item.year,
                    duration: item.duration
                };
            }
        });

        localStorage.setItem("library", JSON.stringify(data));
    }

    private loadFromLocalStorage(): void {
        const saved = localStorage.getItem("library");

        if (saved === null) {
            return;
        }

        this.importJson(saved);
    }
}