import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getSinglePaste } from '../api';

type ParamType = {
    hash: string
}

export const ViewPastePage = () => {
    const [title, setPasteTitle] = useState('');
    const [text, setPasteText] = useState('');
    const [exposure, setPasteExposure] = useState('');
    const [createdDate, setPasteCreatedDate] = useState('');
    const { hash } = useParams<ParamType>();

    useEffect(() => {
        const getPaste = async () => {
            const pasteResponse = await getSinglePaste(hash);
            setPasteTitle(pasteResponse.title);
            setPasteText(pasteResponse.text);
            setPasteExposure(pasteResponse.exposure);
            setPasteCreatedDate(pasteResponse.createdDate);
        }

        getPaste();   
    }, [hash]);


    return (
        <div>
            <h1> {title} </h1>
            <p> {exposure} </p>
            <p> {createdDate} </p>
            <p> {text} </p>
            <button> 
                <Link
                    to={`/edit/${hash}`}
                > Edit </Link> 
            </button>
        </div>
    );
}