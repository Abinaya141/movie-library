import { $, component$, useSignal } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';
import { useForm, valiForm$ } from '@modular-forms/qwik';
import type { SubmitHandler } from '@modular-forms/qwik';

// schema
import { MovieFormSchema } from '~/validations';

// type
import { MovieFormType, MovieType } from '~/types';

// store
import { useMovieStore, useMovieStoreActions } from '~/store';

type Props = {
    id: string;
    Movie: MovieType;
};

export const EditMovieButton = component$((props: Props) => {
    const { id, Movie } = props;
    const store = useMovieStore();
    const isModalVisible = useSignal(false);

    const initial_value = {
        value: {
            id: Movie.id,
            title: Movie.title,
            year: Movie.year,
            genre: Movie.genre,
            rating: Movie.rating,
        },
    };

    const [createForm, { Form, Field }] = useForm<MovieFormType>({
        loader: initial_value,
        validate: valiForm$(MovieFormSchema),
    });

    const handleSubmit: QRL<SubmitHandler<MovieFormType>> = $(async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        useMovieStoreActions.update(store, id, values);
        isModalVisible.value = false;
    });

    return (
        <>
            <button
                class="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-md text-md shadow"
                onClick$={() => (isModalVisible.value = true)}
            >
                Edit
            </button>

            <div
                class={`${isModalVisible.value ? 'fixed' : 'hidden'} inset-0 z-50 grid place-items-center bg-black/60 p-4`}
                role="dialog"
                aria-modal="true"
                onClick$={() => (isModalVisible.value = false)}
            >
                <div
                    class="w-full max-w-xl rounded-xl bg-white p-6 shadow-2xl border border-green-700"
                    onClick$={(e) => e.stopPropagation()}
                >
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-2xl font-semibold">Edit Movie</h2>
                        <button
                            type="button"
                            class="p-2 rounded-full bg-green-900"
                            aria-label="Close"
                            onClick$={() => (isModalVisible.value = false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <Form onSubmit$={handleSubmit} class="space-y-5">
                        <Field name="id">
                            {(field, props) => (
                                <div>
                                    <label class="block text-green-900 text-md font-medium mb-3">Movie ID</label>
                                    <input
                                        {...props}
                                        value={field.value}
                                        class="w-full border border-green-600 px-3 py-2 rounded placeholder-gray-300"
                                        placeholder="Enter Movie ID"
                                    />
                                    {field.error && <p class="mt-1 text-sm text-red-400">{field.error}</p>}
                                </div>
                            )}
                        </Field>

                        <Field name="title">
                            {(field, props) => (
                                <div>
                                    <label class="block text-green-900 text-md font-medium mb-3">Movie Title</label>
                                    <input
                                        {...props}
                                        value={field.value}
                                        class="w-full border border-green-600 px-3 py-2 rounded placeholder-gray-300"
                                        placeholder="Enter Title"
                                    />
                                    {field.error && <p class="mt-1 text-sm text-red-400">{field.error}</p>}
                                </div>
                            )}
                        </Field>

                        <Field name="year">
                            {(field, props) => (
                                <div>
                                    <label class="block text-green-900 text-md font-medium mb-3">Release Year</label>
                                    <input
                                        {...props}
                                        value={field.value}
                                        class="w-full border border-green-600 px-3 py-2 rounded placeholder-gray-300"
                                        placeholder="Enter Year (e.g. 2010)"
                                    />
                                    {field.error && <p class="mt-1 text-sm text-red-400">{field.error}</p>}
                                </div>
                            )}
                        </Field>

                        <Field name="genre">
                            {(field, props) => (
                                <div>
                                    <label class="block text-green-900 text-md font-medium mb-3">Genre</label>
                                    <input
                                        {...props}
                                        value={field.value}
                                        class="w-full border border-green-600 px-3 py-2 rounded placeholder-gray-300"
                                        placeholder="Enter Genre"
                                    />
                                    {field.error && <p class="mt-1 text-sm text-red-400">{field.error}</p>}
                                </div>
                            )}
                        </Field>

                        <Field name="rating">
                            {(field, props) => (
                                <div>
                                    <label class="block text-green-900 text-md font-medium mb-3">Rating</label>
                                    <input
                                        {...props}
                                        value={field.value}
                                        class="w-full border border-green-600 px-3 py-2 rounded placeholder-gray-300"
                                        placeholder="Enter Rating (e.g. PG-13)"
                                    />
                                    {field.error && <p class="mt-1 text-sm text-red-400">{field.error}</p>}
                                </div>
                            )}
                        </Field>

                        <div class="pt-2">
                            <button
                                type="submit"
                                class="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-2 rounded-md"
                                disabled={createForm.submitting}
                            >
                                {createForm.submitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
});
