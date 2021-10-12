import { useState, useEffect } from 'react';
import axios from 'axios';

type Paste = {
    title: string,
    hash: string
}

const getPublicPastes = async () => {
    const allPastesResponse: any = await axios.get('http://localhost:5000/pastes');
    return allPastesResponse.data;
}

export const HomePage = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [exposure, setExposure] = useState('');
    const [pasteList, setPasteList] = useState([]);

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitting', title, text, exposure)

        const response = await axios.post('http://localhost:5000/pastes', {
            title,
            text,
            exposure
        });

        const allPublicPastes = await getPublicPastes();
        setPasteList(allPublicPastes);

        console.log('result:', response.data)
    }

    useEffect(() => {
        const getPasteList = async () => {
            const allPublicPastes = await getPublicPastes();
            setPasteList(allPublicPastes);
        }

        getPasteList();
    }, []);

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <input
                    placeholder="Untitled"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                />
            </div>

            <div>
                <textarea
                    placeholder="Your paste text"
                    cols={30}
                    rows={10}
                    onChange={e => setText(e.target.value)}
                    value={text}
                />
            </div>

            <div>
                <div>
                    <label>
                        Private
                        <input
                            onChange={e => setExposure(e.target.value)}
                            name="exposure"
                            type="radio"
                            value="private"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Public
                        <input
                            onChange={e => setExposure(e.target.value)}
                            name="exposure"
                            type="radio"
                            value="public"
                        />
                    </label>
                </div>
            </div>

            <ul>
                {
                    pasteList.length ? (
                        pasteList.map((pasteItem: Paste) => (
                            <li key={pasteItem.hash}> 
                                {pasteItem.title}
                            </li>
                        )
                    )) : null
                }
            </ul>

            <button type="submit">Submit</button>
        </form>
    );
}