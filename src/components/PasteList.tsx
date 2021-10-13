import { Link } from "react-router-dom";

import { Paste } from '../types';

type Props = {
    pasteList: Paste[]
}

export const PasteList = (props: Props) => {
    return (
        <ul>
            {
                props.pasteList.length ? (
                    props.pasteList.map((pasteItem: Paste) => (
                        <li key={pasteItem.hash}> 
                            <Link 
                                to={`/${pasteItem.hash}`}
                            > {pasteItem.title} </Link>
                        </li>
                    )
                )) : null
            }
        </ul>
    );
}