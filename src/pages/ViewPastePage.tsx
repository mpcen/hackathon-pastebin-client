import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { api } from '../api';
import { Paste } from '../types';
import { UserCircleIcon, CalendarIcon, LockOpenIcon, LockClosedIcon } from '@heroicons/react/outline'

type ParamType = {
    hash: string
}

export const ViewPastePage = () => {
    const [paste, setPaste] = useState({
        title: "Hi",
        exposure: "public",
        hash: "1234",
        createdDate: "today",
        text: "sample text"
    } as Paste);
    const { hash } = useParams<ParamType>();

    useEffect(() => {
        const getPaste = async () => {
            const pasteResponse = await api.getSinglePaste(hash);
            setPaste(pasteResponse);
        }

        getPaste();   
    }, [paste, hash]);

    if(!Object.keys(paste).length) {
        return <p>Fetching paste...</p>
    }

    let lockIcon;
    if (paste.exposure === "private") {
        lockIcon = <LockClosedIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
    } else {
        lockIcon = <LockOpenIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
    }

    return (
        <div>
            <main>
                <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                    <div>
                        <div>
                            <div className="md:grid md:grid-cols-6">
                                <div className="mt-5 md:mt-0 md:col-span-6">
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-1 py-5 bg-white space-y-6 sm:p-6">
                                            <div className="py-5">
                                                <div>
                                                <p className="text-5xl leading-6 text-gray-900">{paste.title}</p>
                                                </div>
                                                <div>
                                                    <UserCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">John Doe</p>
                                                </div>
                                                <div>
                                                    <CalendarIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{paste.createdDate}</p>
                                                </div>
                                                <div>
                                                {lockIcon}
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">{paste.exposure}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="paste-text" className="block text-sm font-medium text-gray-700">
                                                Paste text
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                <textarea
                                                    id="paste-text"
                                                    name="paste-text"
                                                    rows={3}
                                                    className="relative w-full bg-gray shadow-sm rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={''}
                                                    value={paste.text}
                                                    disabled
                                                />
                                                </div>
                                            </div>

                                            <div>

                                            <div>
                                                <label htmlFor="paste-text" className="block text-sm font-medium text-gray-700">
                                                Exposure
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                <input
                                                    id="exposure"
                                                    name="exposure"
                                                    className="relative w-full bg-gray rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={''}
                                                    value={paste.exposure}
                                                    disabled
                                                />
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-w text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <Link to={`/edit/${hash}`}>Edit</Link> 
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden sm:block" aria-hidden="true">
                            <div className="py-5">
                            <div className="border-t border-gray-200" />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        </div>
    );
}