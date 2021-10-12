type Props = {
    title: string, 
    setPasteTitle: React.Dispatch<React.SetStateAction<string>>, 
    text: string, 
    setPasteText: React.Dispatch<React.SetStateAction<string>>,
    exposure: string,
    setPasteExposure: React.Dispatch<React.SetStateAction<string>>,
    handleOnSubmit: React.FormEventHandler
}

export const PasteForm = (props: Props) => {

    return (
        <form onSubmit={props.handleOnSubmit}>
            <div>
                <input
                    placeholder="Untitled"
                    onChange={e => props.setPasteTitle(e.target.value)}
                    value={props.title}
                />
            </div>

            <div>
                <textarea
                    placeholder="Your paste text"
                    cols={30}
                    rows={10}
                    onChange={e => props.setPasteText(e.target.value)}
                    value={props.text}
                />
            </div>

            <div>
                <div>
                    <label>
                        Private
                        <input
                            onChange={e => props.setPasteExposure(e.target.value)}
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
                            onChange={e => props.setPasteExposure(e.target.value)}
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