import { component$ } from '@builder.io/qwik';

//components
import { CreateMovieButton } from './create-button';

export const Heading = component$(() => {
    return (
        <div class="flex items-center justify-between mb-6 px-4">
            <h1 class="text-4xl font-bold text-gray-800">Movie Library</h1>
            <CreateMovieButton />
        </div>
    );
});