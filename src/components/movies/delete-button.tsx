import { $, component$, useSignal } from '@builder.io/qwik';
import { useMovieStore, useMovieStoreActions } from '~/store';

type Props = {
    id:number;
};

export const DeleteMovieButton = component$((props: Props) => {
    const { id } = props;

    console.log("props --", props)
    console.log("props.id --", props.id)
    const store = useMovieStore();
    const isModalVisible = useSignal(false);

    const onDelete = $(() => {
        console.log("in component id - ", props.id)
        useMovieStoreActions.remove(store, props.id);
        isModalVisible.value = false;
    });

    return (
        <>
            <button
                class="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-md text-md shadow"
                onClick$={() => (isModalVisible.value = true)}
            >
                Delete - { id}
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
                        <div class="flex justify-center items-center mb-4">
                            <h2 class="text-2xl font-semibold">Confirm your deletion</h2>
                            <button
                                class="text-white text-xl bg-green-800 rounded-full px-2 ml-auto"
                                onClick$={() => (isModalVisible.value = false)}
                            >
                                ✕
                            </button>
                        </div>

                        <p class="mb-6 text-lg text-green-900">
                            Are you sure you want to delete this Movie?
                        </p>

                        <div class="flex justify-center gap-4">
                            <button
                                class="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                                onClick$={() => (isModalVisible.value = false)}
                            >
                                Cancel
                            </button>
                            <button
                                class="px-4 py-2 bg-green-900 hover:bg-green-800 text-white rounded-md font-semibold transition"
                                onClick$={()=>onDelete()}
                            >
                                Yes, Delete - { id}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
