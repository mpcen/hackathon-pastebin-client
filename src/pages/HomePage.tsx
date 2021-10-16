import { useState, useEffect } from "react";

import { PasteForm } from "../components/PasteForm";
import { PasteList } from "../components/PasteList";
import { api } from "../api";
import { Paste } from "../types";

export const HomePage = () => {
  const [paste, setPaste] = useState<Paste>({
    title: "",
    text: "",
    exposure: "",
  });
  const [pasteList, setPasteList] = useState<Paste[]>([]);

  useEffect(() => {
    const getPastes = async () => {
      const pasteList = await api.getPublicPastes();
      setPasteList(pasteList);
    };
    getPastes();

    const events = new EventSource(`${process.env.REACT_APP_API}/events`);

    events.onmessage = (event) => {
      setPasteList(prevState => [...prevState, JSON.parse(event.data)]);
    };
  }, []);

  const onFormSubmit = async () => {
    await api.createNewPaste(paste);
  };

    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">New Paste</h1>
                </div>
            </header>
            <main className="flex justify-center min-w-full">
                <div className="grid max-w-7xl w-full py-4 sm:px-6 lg:px-8 justify-center">
                    <div className="grid grid-cols-4 gap-4 justify-center w-full">
                        <div className="col-span-3 row-span-auto min-w-full">
                        <PasteForm 
                            paste={paste}
                            setPaste={setPaste}
                            onFormSubmit={onFormSubmit}
                        />
                        </div>
                        <div className="col-span-1 row-span-auto w-auto">
                        <PasteList 
                            pasteList={pasteList}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
  );
};
