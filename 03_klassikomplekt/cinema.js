// Movie class - represents a movie with a title and duration
var Movie = /** @class */ (function () {
    function Movie(title, duration) {
        this.title = title;
        this.duration = duration;
    }
    return Movie;
}());
// Screening class - represents a screening of a movie at a specific time with available seats
var Screening = /** @class */ (function () {
    function Screening(movie, time, availableSeats, totalSeats) {
        this.movie = movie;
        this.time = time;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }
    Screening.prototype.bookSeat = function () {
        if (this.availableSeats > 0) {
            this.availableSeats--;
            return true;
        }
        return false;
    };
    return Screening;
}());
// Cinema class - represents a cinema with a name and a list of screenings
var Cinema = /** @class */ (function () {
    function Cinema(name) {
        this.screenings = []; // list of screenings available at the cinema
        this.name = name;
    }
    Cinema.prototype.addScreening = function (screening) {
        this.screenings.push(screening);
    };
    Cinema.prototype.displayScreenings = function (cinemaIndex) {
        return this.screenings.map(function (s, index) {
            var button = s.availableSeats > 0
                ? "<button onclick=\"book(".concat(cinemaIndex, ", ").concat(index, ")\">Book Seat</button>")
                : "<span style=\"color:red; font-weight:bold;\">Sold Out</span>";
            return "\n                ".concat(s.movie.title, " (").concat(s.movie.duration, " min) - ").concat(s.time, "<br>\n                Available seats: ").concat(s.availableSeats, " / ").concat(s.totalSeats, "<br>\n                ").concat(button, "\n            ");
        }).join("<br><br>");
    };
    return Cinema;
}());
var cinema = new Cinema("Apollo Kino Plaza");
var cinema2 = new Cinema("Apollo Kino Mustamäe");
var movie1 = new Movie("Avatar: Fire and Ash", 197);
var movie2 = new Movie("Marty Supreme", 150);
var movie3 = new Movie("Home Alone", 103);
var movie4 = new Movie("1+1", 112);
cinema.addScreening(new Screening(movie1, "18:00", 15, 65));
cinema.addScreening(new Screening(movie2, "15:40", 32, 65));
cinema2.addScreening(new Screening(movie3, "16:15", 2, 72));
cinema2.addScreening(new Screening(movie4, "21:00", 10, 40));
function updateView() {
    var div = document.getElementById("output");
    var cinemas = [cinema, cinema2];
    if (div) {
        div.innerHTML = cinemas.map(function (cinema, cinemaIndex) {
            return "<h2>".concat(cinema.name, "</h2>") +
                cinema.displayScreenings(cinemaIndex);
        }).join("<br><br>");
    }
}
function book(cinemaIndex, screeningIndex) {
    var cinemas = [cinema, cinema2];
    cinemas[cinemaIndex].screenings[screeningIndex].bookSeat();
    updateView();
}
window.onload = updateView;
