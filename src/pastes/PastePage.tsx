import { useParams } from 'react-router-dom'

type ParamTypes = {
    hash: string;
}

export const PastePage = () => {
    const { hash } = useParams<ParamTypes>();

    return (
        <>
            <h1>Paste Page</h1>
            <p>{hash}</p>
        </>
    )
}