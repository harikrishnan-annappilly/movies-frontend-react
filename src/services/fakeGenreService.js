export const genres = [
    { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
];

export function getGenres() {
    console.log("getting genere");
    return genres.filter((g) => g);
}
