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
            <main className="flex justify-center">
                <div className="max-w-7xl py-4 sm:px-6 lg:px-8 justify-center">
                    <div className="grid grid-cols-4 gap-4 justify-center">
                        <div className="col-span-3 row-span-auto">
                        <PasteForm 
                            paste={paste}
                            setPaste={setPaste}
                            onFormSubmit={onFormSubmit}
                        />
                        </div>
                        <div className="col-span-1 row-span-auto">
                        <PasteList 
                            pasteList={pasteList}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}