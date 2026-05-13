var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LibraryItem = /** @class */ (function () {
    function LibraryItem(id, title, author, year) {
        if (id.trim() === "")
            throw new Error("ID cannot be empty");
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }
    LibraryItem.prototype.getId = function () { return this.id; };
    LibraryItem.prototype.getTitle = function () { return this.title; };
    LibraryItem.prototype.getAuthor = function () { return this.author; };
    LibraryItem.prototype.getYear = function () { return this.year; };
    LibraryItem.prototype.getSummary = function () { return "[Item] ".concat(this.title); };
    return LibraryItem;
}());
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(id, title, author, year, pages, ISBN) {
        var _this = _super.call(this, id, title, author, year) || this;
        if (pages <= 0)
            throw new Error("Pages must be positive");
        _this.pages = pages;
        _this.ISBN = ISBN;
        return _this;
    }
    Book.prototype.getSummary = function () {
        return "[Book] ".concat(this.title, " by ").concat(this.author, ", ").concat(this.year, ", ").concat(this.pages, " pages, ISBN: ").concat(this.ISBN);
    };
    return Book;
}(LibraryItem));
var DVD = /** @class */ (function (_super) {
    __extends(DVD, _super);
    function DVD(id, title, author, year, duration) {
        var _this = _super.call(this, id, title, author, year) || this;
        _this.duration = duration;
        return _this;
    }
    DVD.prototype.getSummary = function () {
        return "[DVD] ".concat(this.title, " by ").concat(this.author, ", ").concat(this.year, ", ").concat(this.duration, " min");
    };
    return DVD;
}(LibraryItem));
var LibraryManagement = /** @class */ (function () {
    function LibraryManagement() {
        this.items = [];
        this.loadFromLocalStorage();
    }
    LibraryManagement.prototype.addItem = function (item) {
        this.items.push(item);
        this.saveToLocalStorage();
    };
    LibraryManagement.prototype.removeItem = function (id) {
        var index = this.items.findIndex(function (item) { return item.getId() === id; });
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        this.saveToLocalStorage();
        return true;
    };
    LibraryManagement.prototype.listItems = function () {
        return this.items;
    };
    LibraryManagement.prototype.printItems = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log(item.getSummary());
        }
    };
    LibraryManagement.prototype.exportJson = function () {
        var data = this.items.map(function (item) {
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
    };
    LibraryManagement.prototype.importJson = function (json) {
        try {
            var data = JSON.parse(json);
            if (!Array.isArray(data)) {
                throw new Error("JSON must contain an array");
            }
            this.items = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                if (item.type === "book") {
                    this.items.push(new Book(item.id, item.title, item.author, item.year, item.pages, item.ISBN));
                }
                else if (item.type === "dvd") {
                    this.items.push(new DVD(item.id, item.title, item.author, item.year, item.duration));
                }
            }
            this.saveToLocalStorage();
        }
        catch (error) {
            console.log("Invalid JSON file");
        }
    };
    LibraryManagement.prototype.importText = function (text) {
        try {
            var lines = text
                .split("\n")
                .map(function (line) { return line.trim(); })
                .filter(function (line) { return line !== ""; });
            this.items = [];
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                var line = lines_1[_i];
                var parts = line.split("|");
                var type = parts[0];
                if (type === "BOOK") {
                    var id = parts[1];
                    var title = parts[2];
                    var author = parts[3];
                    var year = Number(parts[4]);
                    var pages = Number(parts[5]);
                    var ISBN = parts[6];
                    this.items.push(new Book(id, title, author, year, pages, ISBN));
                }
                if (type === "DVD") {
                    var id = parts[1];
                    var title = parts[2];
                    var author = parts[3];
                    var year = Number(parts[4]);
                    var duration = Number(parts[5]);
                    this.items.push(new DVD(id, title, author, year, duration));
                }
            }
            this.saveToLocalStorage();
        }
        catch (error) {
            console.log("Invalid text import");
        }
    };
    LibraryManagement.prototype.saveToLocalStorage = function () {
        var data = this.items.map(function (item) {
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
    };
    LibraryManagement.prototype.loadFromLocalStorage = function () {
        var saved = localStorage.getItem("library");
        if (saved === null) {
            return;
        }
        this.importJson(saved);
    };
    return LibraryManagement;
}());
