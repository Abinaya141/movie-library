import { $, component$, useSignal } from '@builder.io/qwik';
import type { QRL } from '@builder.io/qwik';

// Forms
import { useForm, valiForm$ } from '@modular-forms/qwik';
import type { SubmitHandler } from '@modular-forms/qwik';

// Store
import { useMovieStore, useMovieStoreActions } from '~/store';

// Validation
import { MovieFormSchema } from '~/validations';

// Form schema
import type { MovieFormType } from '~/types';

export const CreateMovieButton = component$(() => {
    const store = useMovieStore();
    const isModalVisible = useSignal<boolean>(false);

    const initial_value = {
        value: { id: '', title: '', year: '', genre: '', rating: '' },
    };

    const [createForm, { Form, Field }] = useForm<MovieFormType>({
        loader: initial_value,
        validate: valiForm$(MovieFormSchema),
    });

    const handleSubmit: QRL<SubmitHandler<MovieFormType>> = $(async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        useMovieStoreActions.add(store, values);
        isModalVisible.value = false;
    });

    return (
        <>
            <button
                class="bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2.5 rounded-md shadow-all"
                onClick$={() => (isModalVisible.value = true)}
            >
                Add Movie +
            </button>

            <div
                class={`${isModalVisible.value ? 'fixed' : 'hidden'} inset-0 z-50 grid place-items-center bg-black/60 p-4`}
                role="dialog"
                aria-modal="true"
                onClick$={() => (isModalVisible.value = false)}
            >
                <div
                    class="w-full max-w-lg bg-white rounded-xl p-6 space-y-6 shadow-2xl border border-green-700"
                    onClick$={(e) => e.stopPropagation()}
                >
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-semibold tracking-wide">New Movie</h2>
                        <button
                            type="button"
                            class="p-2 rounded-full hover:text-white hover:bg-green-900"
                            aria-label="Close"
                            onClick$={() => (isModalVisible.value = false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
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
                                class="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
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
