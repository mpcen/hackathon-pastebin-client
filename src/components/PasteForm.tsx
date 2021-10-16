import { Paste } from '../types';
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
    paste: Paste;
    setPaste: React.Dispatch<React.SetStateAction<Paste>>;
    onFormSubmit: () => Promise<void>;
}

const exposureCapitalized = new Map<string, string>([
    ["private", "Private"],
    ["public", "Public"]
]);

export const PasteForm = (props: Props) => {
    const { paste, setPaste, onFormSubmit } = props;

    const handleOnSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await onFormSubmit();
    }

    return (
        <div>
            <div>
                <div className="mt-5 md:mt-0 md:col-span-4 min-w-full">
                    <form onSubmit={handleOnSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6 w-full">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    </div>
                                    <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Untitled"
                                    onChange={e => setPaste(prevState => ({ ...prevState, title: e.target.value }))}
                                    value={paste.title}
                                    required
                                    />
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
                                    rows={15}
                                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Your paste text"
                                    defaultValue={''}
                                    onChange={e => setPaste(prevState => ({ ...prevState, text: e.target.value }))}
                                    value={paste.text}
                                    required
                                />
                                </div>
                            </div>

                            <div>

                            <Listbox value={paste.exposure} onChange={e => setPaste(prevState => ({ ...prevState, exposure: e }))}>
                                <Listbox.Label className="block text-sm font-medium text-gray-700">Exposure</Listbox.Label>
                                <div className="mt-1 relative">
                                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span className="flex items-center">
                                        <span className="ml-3 block truncate">{paste.exposure ? exposureCapitalized.get(paste.exposure) : "Public"}</span>
                                    </span>
                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    </Listbox.Button>

                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                            key="public"
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                            }
                                            value="public"
                                        >
                                                <div className="flex items-center">
                                                <span className={classNames('ml-3 block truncate')}>
                                                    Public
                                                </span>
                                                </div>
                                        </Listbox.Option>
                                        <Listbox.Option
                                            key="private"
                                            className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                            }
                                            value="private"
                                        >
                                                <div className="flex items-center">
                                                <span className={classNames('ml-3 block truncate')}>
                                                    Private
                                                </span>
                                                </div>
                                        </Listbox.Option>
                                    </Listbox.Options>
                                    </Transition>
                                </div>
                                </Listbox>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                <div className="border-t border-gray-200" />
                </div>
            </div>
        </div>
    );
}