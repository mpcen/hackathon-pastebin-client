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
            <PasteForm
                paste={paste}
                setPaste={setPaste}
                onFormSubmit={onFormSubmit}
            />
        </div>
    );
}