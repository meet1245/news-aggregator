import { create } from 'zustand'
import { devtools } from "zustand/middleware";
import { produce } from "immer";

const useCountStore = create(

    devtools((set, get) => ({
        state: "",
        data: '',
        search: (payload) => {
            set(
                produce((draft) => {
                    draft.data = payload;
                })
            );
        },
        authorSearch: '',
        authorId: (payload) => {
            set(
                produce((draft) => {
                    draft.authorSearch = payload;
                })
            );
        },

    }))

);

export default useCountStore;