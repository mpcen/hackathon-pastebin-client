import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { api } from '../api';
import { PasteForm } from '../components/PasteForm';
import { Paste } from '../types';

type ParamType = {
    hash: string
}

export const EditPastePage = () => {
    const [paste, setPaste] = useState<Paste>({} as Paste);
    const { hash } = useParams<ParamType>();

    useEffect(() => {
        const getPaste = async () => {
            const pasteResponse = await api.getSinglePaste(hash);
            
            setPaste(pasteResponse);
        }

        getPaste();   
    }, [hash]);

    const onFormSubmit = async () => {
        const response = await api.editPaste(paste);
        
        setPaste(response);
    }

    return (

        <div>
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Paste</h1>
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
                </div>
            </div>
        </main>
    </div>
    );
}