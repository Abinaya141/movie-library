import { useStore } from "@builder.io/qwik";
import { createContextId, useContextProvider, useContext } from "@builder.io/qwik";

// type
import { MovieType } from "~/types";

type StoreType = {
    movies: MovieType[];
};
export const MovieStoreContextID = createContextId<StoreType>("movie-store");

export const useInitMovieStore = () => {
    const store = useStore<StoreType>({
        movies: [
            {
                id: "101",
                title: "Inception",
                year: "2010",
                genre: "Science Fiction",
                rating: "PG-13"
            },
            {
                id: "102",
                title: "The Shawshank Redemption",
                year: "1994",
                genre: "Drama",
                rating: "R"
            },
            {
                id: "103",
                title: 'Interstellar',
                year: '2014',
                genre: 'Sci-Fi/Adventure',
                rating: 'PG-13',
            },
            {
                id: "104",
                title: 'The Dark Knight',
                year: '2008',
                genre: 'Action/Crime',
                rating: 'PG-13',
            },
            {
                id: "105",
                title: 'Forrest Gump',
                year: '1994',
                genre: 'Drama/Romance',
                rating: 'PG-13',
            },
            {
                id: "106",
                title: 'Parasite',
                year: '2019',
                genre: 'Thriller/Drama',
                rating: 'R',
            },
            {
                id: "107",
                title: 'The Matrix',
                year: '1999',
                genre: 'Action/Sci-Fi',
                rating: 'R',
            },
        ],
    });

    useContextProvider(MovieStoreContextID, store);
};

// Store Hook
export const useMovieStore = () => useContext(MovieStoreContextID);

// Actions
export const useMovieStoreActions = {
    add(store: StoreType, Movie: MovieType) {
        store.movies.push(Movie);
    },
    
    // remove(store: StoreType, id: number) {
    //     console.log("id - ", id)
    //     const row = id
    //     if (row !== -1) {
    //         store.movies.splice(row, 1)
    //     }
    // },

    remove(store: StoreType, id: string) {
        const index = store.movies.findIndex((movie) => movie.id === id);
        if (index !== -1) {
            store.movies.splice(index, 1);
        }
    },


    update(store: StoreType, id: string, record: MovieType) {
        const index = store.movies.findIndex((row) => row.id == id);
        // if (index !== -1) {
        //     // store.movies[index] = record;
        //     store.movies[index].id = record.id;
        //     store.movies[index].title = record.title;
        //     store.movies[index].year = record.year;
        //     store.movies[index].genre = record.genre;
        //     store.movies[index].rating = record.rating;
        // }
        if (index !== -1) {
            const store_record = store.movies[index];
            for (const key in record) {
                (store_record as any)[key] = (record as any)[key]
            }
        }
    },
};









