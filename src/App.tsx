import { useState } from 'react';
import axios from 'axios';

export const App = () => {
    const [text, setText] = useState('');
    const [exposure, setExposure] = useState('');

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submitting', text, exposure)

        const response = await axios.post('http://localhost:5000/', {
            text,
            exposure
        });

        console.log('result:', response.data)
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <textarea
                placeholder="Your paste text"
                cols={30}
                rows={10}
                onChange={e => setText(e.target.value)}
                value={text}
            />

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

            <button type="submit">Submit</button>
        </form>
    );
}