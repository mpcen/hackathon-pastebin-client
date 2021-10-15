import { Link } from "react-router-dom";

import { Paste } from '../types';

type Props = {
    pasteList: Paste[]
}

export const PasteList = (props: Props) => {
    return (
    <div className="flex mt-5 md:mt-0 md:col-span-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="flex py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="overflow-hidden min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Public Pastes
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {props.pasteList.map((pasteItem) => (
                        <tr key={pasteItem.hash}>
                            <td className="px-2 py-1 h-12 max-h-full overflow-hidden">
                            <div className="flex items-center">
                                <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                <Link 
                                    to={`/${pasteItem.hash}`}
                                > {pasteItem.title} </Link>
                                </div>
                                <div className="overflow-hidden text-sm text-gray-500 max-h-6">{pasteItem.text}</div>
                                </div>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}