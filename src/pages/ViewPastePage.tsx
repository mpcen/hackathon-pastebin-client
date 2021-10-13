import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { api } from '../api';
import { Paste } from '../types';

type ParamType = {
    hash: string
}

export const ViewPastePage = () => {
    const [paste, setPaste] = useState({} as Paste);
    const { hash } = useParams<ParamType>();

    useEffect(() => {
        const getPaste = async () => {
            const pasteResponse = await api.getSinglePaste(hash);
            setPaste(pasteResponse);
        }

        getPaste();   
    }, [hash]);

    if(!Object.keys(paste).length) {
        return <p>Fetching paste...</p>
    }

    return (
        <div>
            <h1>{paste.title}</h1>
            <p>{paste.exposure}</p>
            <p>{paste.createdDate}</p>
            <p>{paste.text}</p>
            <button> 
                <Link to={`/edit/${hash}`}>Edit</Link> 
            </button>
        </div>
    );
}