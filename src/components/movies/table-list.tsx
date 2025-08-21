import { component$ } from '@builder.io/qwik';

// components
import { EditMovieButton } from './edit-button';
import { DeleteMovieButton } from './delete-button';

// type
import { MovieType } from '~/types';

type Props = {
    data: MovieType[];
};

export const MovieList = component$((props: Props) => {
    const { data } = props;

    return (
        <div class="px-10 mt-10">
            <div class="overflow-x-auto rounded shadow-md border border-gray-200 bg-white">
                <table class="min-w-full text-md">
                    <thead class="bg-gray-100 text-gray-600 uppercase text-lg font-semibold">
                        <tr>
                            <th class="px-5 py-4 text-center font-bold">ID</th>
                            <th class="px-5 py-4 text-center font-bold">Title</th>
                            <th class="px-5 py-4 text-center font-bold">Author</th>
                            <th class="px-5 py-4 text-center font-bold">Genre</th>
                            <th class="px-5 py-4 text-center font-bold">ISBN</th>
                            <th class="px-5 py-4 text-center font-bold">Actions</th>
                        </tr>
                    </thead>

                    <tbody class="text-gray-700 divide-y divide-gray-200">
                        {data.map((row) => (
                            <tr key={row.id} class="hover:bg-gray-50">
                                <td class="px-5 py-3 font-semibold text-center">{row.id}</td>
                                <td class="px-5 py-3 font-semibold text-center">{row.title}</td>
                                <td class="px-5 py-3 font-semibold text-center">{row.year}</td>
                                <td class="px-5 py-3 font-semibold text-center">{row.genre}</td>
                                <td class="px-5 py-3 font-semibold text-center">{row.rating}</td>
                                <td class="px-5 py-3 text-center">
                                    <div class="flex justify-center gap-4">
                                        <EditMovieButton id={row.id} Movie={row} />
                                        <DeleteMovieButton id={row.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

