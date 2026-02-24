// Movie class - represents a movie with a title and duration
class Movie {
    title: string; // title of the movie
    duration: number; // in minutes

    constructor(title: string, duration: number) {
        this.title = title;
        this.duration = duration;
    }
}

// Screening class - represents a screening of a movie at a specific time with available seats
class Screening {
    movie: Movie; // the movie being screened
    time: string; // e.g., "18:00"
    availableSeats: number; // number of available seats for this screening
    totalSeats: number; // total number of seats for this screening

    constructor(movie: Movie, time: string, availableSeats: number, totalSeats: number) {
        this.movie = movie;
        this.time = time;
        this.totalSeats = totalSeats;
        this.availableSeats = availableSeats;
    }

    bookSeat(): boolean {
        if (this.availableSeats > 0) {
            this.availableSeats--;
            return true;
        }
        return false;
    }
}

// Cinema class - represents a cinema with a name and a list of screenings
class Cinema {
    name: string; // name of the cinema
    screenings: Screening[] = []; // list of screenings available at the cinema

    constructor(name: string) {
        this.name = name;
    }

    addScreening(screening: Screening) {
        this.screenings.push(screening);
    }

    displayScreenings(cinemaIndex: number): string {
        return this.screenings.map((s, index) => {

            const button = s.availableSeats > 0
                ? `<button onclick="book(${cinemaIndex}, ${index})">Book Seat</button>`
                : `<span style="color:red; font-weight:bold;">Sold Out</span>`;

            return `
                ${s.movie.title} (${s.movie.duration} min) - ${s.time}<br>
                Available seats: ${s.availableSeats} / ${s.totalSeats}<br>
                ${button}
            `;
        }).join("<br><br>");
    }
}

const cinema = new Cinema("Apollo Kino Plaza");
const cinema2 = new Cinema("Apollo Kino Plaza");

const movie1 = new Movie("Avatar: Fire and Ash", 197);
const movie2 = new Movie("Marty Supreme", 150);
const movie3 = new Movie("Home Alone", 103);
const movie4 = new Movie("1+1", 112);

cinema.addScreening(new Screening(movie1, "18:00", 15, 65));
cinema.addScreening(new Screening(movie2, "15:40", 32, 65));

cinema2.addScreening(new Screening(movie3, "16:15", 2, 72));
cinema2.addScreening(new Screening(movie4, "21:00", 10, 40));

function updateView() {
    const div = document.getElementById("output");
    const cinemas: Cinema[] = [cinema, cinema2];

    if (div) {
        div.innerHTML = cinemas.map((cinema, cinemaIndex) =>
            `<h2>${cinema.name}</h2>` +
            cinema.displayScreenings(cinemaIndex)
        ).join("<br><br>");
    }
}

function book(cinemaIndex: number, screeningIndex: number) {
    const cinemas = [cinema, cinema2];
    cinemas[cinemaIndex].screenings[screeningIndex].bookSeat();
    updateView();
}

window.onload = updateView;