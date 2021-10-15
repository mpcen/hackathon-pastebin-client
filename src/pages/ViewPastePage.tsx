import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { api } from '../api';
import { Paste } from '../types';
import { UserCircleIcon, CalendarIcon, LockOpenIcon, LockClosedIcon } from '@heroicons/react/outline'

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
    }, [paste, hash]);

    if(!Object.keys(paste).length) {
        return <p>Fetching paste...</p>
    }

    let lockIcon, exposureSetting;
    if (paste.exposure === "private") {
        lockIcon = <LockClosedIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
        exposureSetting = "Private"
    } else {
        lockIcon = <LockOpenIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
        exposureSetting = "Public"
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
                                    <div className="shadow sm:rounded-md">
                                        <div className="px-1 py-5 bg-white space-y-6 sm:p-6">
                                            <div>
                                                <div>
                                                    <p className="text-5xl pb-4 text-gray-900">{paste.title}</p>
                                                </div>
                                                {/* <div className="flex pb-1">
                                                    <UserCircleIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <p className="max-w-2xl text-sm text-gray-500m px-1">John Doe</p>
                                                </div> */}
                                                <div className="flex pb-1">
                                                    <CalendarIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                                    <p className="max-w-2xl text-sm text-gray-500 px-1">{paste.createdDate}</p>
                                                </div>
                                                <div className="flex">
                                                {lockIcon}
                                                <p className="max-w-2xl text-sm text-gray-500 px-1">{exposureSetting}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="paste-text" className="block text-sm font-medium pb-1 text-gray-700">
                                                Paste text
                                                </label>
                                                <div className="mt-1 relative rounded-md">
                                                <textarea
                                                    id="paste-text"
                                                    name="paste-text"
                                                    rows={15}
                                                    className="relative w-full bg-gray shadow-sm rounded-md pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    defaultValue={''}
                                                    value={paste.text}
                                                    disabled
                                                />
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