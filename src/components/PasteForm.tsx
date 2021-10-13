import { Paste } from '../types';

type Props = {
    paste: Paste;
    setPaste: React.Dispatch<React.SetStateAction<Paste>>;
    onFormSubmit: () => Promise<void>;
}

export const PasteForm = (props: Props) => {
    const { paste, setPaste, onFormSubmit } = props;

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await onFormSubmit();
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div>
                <input
                    placeholder="Untitled"
                    onChange={e => setPaste(prevState => ({ ...prevState, title: e.target.value }))}
                    value={paste.title}
                />
            </div>

            <div>
                <textarea
                    placeholder="Your paste text"
                    cols={30}
                    rows={10}
                    onChange={e => setPaste(prevState => ({ ...prevState, text: e.target.value }))}
                    value={paste.text}
                />
            </div>

            <div>
                <div>
                    <label>
                        Private
                        <input
                            onChange={e => setPaste(prevState => ({ ...prevState, exposure: e.target.value }))}
                            name="exposure"
                            type="radio"
                            checked={paste.exposure === "private"}
                            value="private"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Public
                        <input
                            onChange={e => setPaste(prevState => ({ ...prevState, exposure: e.target.value }))}
                            name="exposure"
                            type="radio"
                            checked={paste.exposure === "public"}
                            value="public"
                        />
                    </label>
                </div>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}