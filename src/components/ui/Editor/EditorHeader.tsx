import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { receiveCode } from "../../../slices/codeSlice";
import { RefreshCw } from 'lucide-react';

export const EditorHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const code = useSelector((state: RootState) => state.code.code);
    const language = useSelector((state: RootState) => state.code.language);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'F5') {
                event.preventDefault(); 
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault(); 

        const codeData = { code, language };
        
        await dispatch(receiveCode(codeData))
            .then((response) => {
                console.log("Code executed successfully:", response);
            })
            .catch((error) => {
                console.error("Error executing code:", error);
            });
    };

    const handleRefresh = () => {
        window.location.reload();
    }

    const handleExport = () => {
        const blob = new Blob([code], { type: `text/plain` });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `script.${language === 'JavaScript' ? 'js' : 'ts'}`;

        link.click();
    }

    return (
        <header className="w-full h-14 bg-transparent border-b border-neutral-500 flex items-center justify-between">
            <div className="ml-5">
                <h3 className="text-neutral-400 cursor-default">script.js</h3>
            </div>
            <div className="mr-2 flex gap-2">
                <button onClick={handleRefresh} className="cursor-pointer transition-all hover:bg-neutral-800 w-[40px] h-[40px] rounded-md border-neutral-700 text-neutral-400 border flex justify-center items-center">
                    <RefreshCw size={20} />
                </button>
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="flex gap-1 bg-transparent border border-neutral-700 hover:bg-neutral-800 text-white w-[120px] h-[40px] rounded-md justify-center items-center text-sm transition-all cursor-pointer"
                    >
                        Run Code
                        <div className="w-[30px] h-[25px] rounded-md bg-[#09090B] border-neutral-700 border flex justify-center items-center text-neutral-400">F5</div>
                    </button>
                </form>
                <button
                    onClick={handleExport}
                    className="flex text-black bg-neutral-50 hover:opacity-80 w-[120px] h-[40px] rounded-md justify-center items-center text-md transition-all cursor-pointer"
                >
                    Export
                </button>
            </div>
        </header>
    );
};
