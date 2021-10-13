import axios from "axios";

import { Paste } from '../types';

const { REACT_APP_API } = process.env;

export const api = {
    getPublicPastes: async (): Promise<Paste[]> => {
        const allPastesResponse: any = await axios.get(`${REACT_APP_API}/pastes`);
        return allPastesResponse.data;
    },
    getSinglePaste: async (hash: string): Promise<Paste> => {
        const singlePasteResponse: any = await axios.get(`${REACT_APP_API}/${hash}`);
        return singlePasteResponse.data;
    },
    createNewPaste: async (paste: Paste): Promise<Paste> => {
        const createdPasteResponse: any = await axios.post(`${REACT_APP_API}/pastes/`, {
            title: paste.title,
            text: paste.text,
            exposure: paste.exposure
        });
        return createdPasteResponse.data;
    },
    editPaste: async (paste: Paste): Promise<Paste> => {
        const editPasteResponse: any = await axios.put(`${REACT_APP_API}/pastes/${paste.hash}`, {
            title: paste.title,
            text: paste.text,
            exposure: paste.exposure
        });
        return editPasteResponse.data;
    }
}