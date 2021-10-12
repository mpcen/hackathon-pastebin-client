import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { editPaste, getSinglePaste } from '../api';
import { PasteForm } from '../PasteForm';

type ParamType = {
    hash: string
}

export const EditPastePage = () => {
    const [title, setPasteTitle] = useState('');
    const [text, setPasteText] = useState('');
    const [exposure, setPasteExposure] = useState('');
    const { hash } = useParams<ParamType>();

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitting', title, text, exposure)

        const editPasteResponse = await editPaste({
            title,
            text,
            exposure,
            hash
        });

        console.log('result:', editPasteResponse);
    }

    useEffect(() => {
        const getPaste = async () => {
            const pasteResponse = await getSinglePaste(hash);
            setPasteTitle(pasteResponse.title);
            setPasteText(pasteResponse.text);
            setPasteExposure(pasteResponse.exposure);
        }

        getPaste();   
    }, [hash]);

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
        </div>
    );
}