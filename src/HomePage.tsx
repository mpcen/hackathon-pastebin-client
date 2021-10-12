import { useState, useEffect } from 'react';
import { PasteForm } from './PasteForm';
import { PasteList } from './pastes/PasteList';
import { createNewPaste, getPublicPastes, Paste } from './api';


export const HomePage = () => {
    const [title, setPasteTitle] = useState('');
    const [text, setPasteText] = useState('');
    const [exposure, setPasteExposure] = useState('');
    const [pasteList, setPasteList] = useState<Paste[]>([]);

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitting', title, text, exposure)

        const newPasteResponse = await createNewPaste({
            title,
            text,
            exposure
        });

        setPasteList([...pasteList, newPasteResponse])
    }

    useEffect(() => {
        const getPasteList = async () => {
            const allPublicPastes = await getPublicPastes();
            setPasteList(allPublicPastes);
        }

        getPasteList();
    }, []);

    return (
        <div>
            <PasteForm 
                title={title}
                setPasteTitle={setPasteTitle}
                text={text}
                setPasteText={setPasteText}
                exposure={exposure}
                setPasteExposure={setPasteExposure}
                handleOnSubmit={handleOnSubmit}
            />
            <PasteList 
                pasteList={pasteList}
            />
        </div>
    );
}