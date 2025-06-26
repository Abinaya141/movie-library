import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// components
import { MovieList, Heading } from "~/components/movies";

// store
import { useMovieStore } from "~/store";

export default component$(() => {

  const store = useMovieStore()

  return (
    <div class="mx-auto max-w-screen-xl px-6 py-8">
      <Heading />
      <MovieList data={store.movies} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Movie Library | useStore + useContext",
  meta: [
    {
      name: "description",
      content: "A CRUD Movie Library app using Qwik, Tailwind CSS, and useStore.",
    },
  ],
};
