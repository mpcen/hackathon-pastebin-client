import axios from "axios";

import { Paste } from '../types';

export const api = {
    getPublicPastes: async (): Promise<Paste[]> => {
        const allPastesResponse: any = await axios.get('http://localhost:5000/pastes');
        return allPastesResponse.data;
    },
    getSinglePaste: async (hash: string): Promise<Paste> => {
        const singlePasteResponse: any = await axios.get(`http://localhost:5000/pastes/${hash}`);
        return singlePasteResponse.data;
    },
    createNewPaste: async (paste: Paste): Promise<Paste> => {
        const createdPasteResponse: any = await axios.post(`http://localhost:5000/pastes/`, {
            title: paste.title,
            text: paste.text,
            exposure: paste.exposure
        });
        return createdPasteResponse.data;
    },
    editPaste: async (paste: Paste): Promise<Paste> => {
        const editPasteResponse: any = await axios.put(`http://localhost:5000/pastes/${paste.hash}`, {
            title: paste.title,
            text: paste.text,
            exposure: paste.exposure
        });
        return editPasteResponse.data;
    }
}