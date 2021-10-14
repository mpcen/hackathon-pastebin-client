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
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">New Paste</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <PasteForm 
                            paste={paste}
                            setPaste={setPaste}
                            onFormSubmit={onFormSubmit}
                        />
                        <PasteList 
                            pasteList={pasteList}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}