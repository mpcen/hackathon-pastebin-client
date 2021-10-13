import { useState, useEffect } from 'react';

import { PasteForm } from '../components/PasteForm';
import { PasteList } from '../components/PasteList';
import { api } from '../api';
import { Paste } from '../types';

export const HomePage = () => {
    const [paste, setPaste] = useState<Paste>({
        title: '',
        text: '',
        exposure: ''
    });
    const [pasteList, setPasteList] = useState<Paste[]>([]);

    useEffect(() => {
        const getPasteList = async () => {
            const allPublicPastes = await api.getPublicPastes();
            setPasteList(allPublicPastes);
        }

        getPasteList();
    }, []);

    const onFormSubmit = async () => {
        const response = await api.createNewPaste(paste);

        setPaste(response);
        setPasteList(prevState => [...prevState, response]);
        setPaste({ title: '', text: '', exposure: '' });
    }

    return (
        <>
            <PasteForm 
                paste={paste}
                setPaste={setPaste}
                onFormSubmit={onFormSubmit}
            />
            <PasteList 
                pasteList={pasteList}
            />
        </>
    );
}