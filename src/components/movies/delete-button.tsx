import { $, component$, useSignal } from '@builder.io/qwik';
import { useMovieStore, useMovieStoreActions } from '~/store';

type Props = {
    id: string;
};

export const DeleteMovieButton = component$((props: Props) => {
    const { id } = props;
    const store = useMovieStore();
    const isModalVisible = useSignal(false);

    const onDelete = $(() => {
        useMovieStoreActions.remove(store, id);
        isModalVisible.value = false;
    });

    return (
        <>
            <button
                class="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-md text-md shadow"
                onClick$={() => (isModalVisible.value = true)}
            >
                Delete
            </button>

            {isModalVisible.value && (
                <div
                    class="fixed inset-0 z-50 grid place-content-center bg-black/60 p-4"
                    onClick$={() => (isModalVisible.value = false)}
                >
                    <div
                        class="bg-white border border-green-700 rounded-xl shadow-2xl p-6 max-w-md w-full"
                        onClick$={(e) => e.stopPropagation()}
                    >
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-semibold text-green-900">Confirm Deletion</h2>
                            <button
                                class="text-white bg-green-800 hover:bg-green-900 rounded-full w-8 h-8 flex items-center justify-center"
                                onClick$={() => (isModalVisible.value = false)}
                            >
                                ✕
                            </button>
                        </div>

                        <p class="mb-6 text-green-800 text-lg">
                            Are you sure you want to delete this movie?
                        </p>

                        <div class="flex justify-end gap-4">
                            <button
                                class="px-4 py-2 bg-gray-300 text-green-900 rounded-md hover:bg-gray-400"
                                onClick$={() => (isModalVisible.value = false)}
                            >
                                Cancel
                            </button>
                            <button
                                class="px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-md font-semibold"
                                onClick$={onDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

