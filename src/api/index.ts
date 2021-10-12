import axios from "axios";

export type Paste = {
    title: string,
    text: string,
    exposure: string,
    hash?: string
}

export const getPublicPastes = async () => {
    const allPastesResponse: any = await axios.get('http://localhost:5000/pastes');
    return allPastesResponse.data;
}

export const getSinglePaste = async (hash: string) => {
    const singlePasteResponse: any = await axios.get(`http://localhost:5000/pastes/${hash}`);
    return singlePasteResponse.data;
}

export const createNewPaste = async (paste: Paste) => {
    const createdPasteResponse: any = await axios.post(`http://localhost:5000/pastes/`, {
        title: paste.title,
        text: paste.text,
        exposure: paste.exposure
    });
    return createdPasteResponse.data;
}

export const editPaste = async (paste: Paste) => {
    const editPasteResponse: any = await axios.put(`http://localhost:5000/pastes/${paste.hash}`, {
        title: paste.title,
        text: paste.text,
        exposure: paste.exposure
    });
    return editPasteResponse.data;
}