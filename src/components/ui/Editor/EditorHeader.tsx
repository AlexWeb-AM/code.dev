export const EditorHeader = () => {
    return (
        <header className='w-full h-14 bg-transparent border-b border-neutral-500 flex items-center justify-between'>
            <div className="ml-5">
                <h3 className='text-neutral-400 cursor-default'>script.js</h3>
            </div>
            <div className="mr-2 flex gap-2">
                <button className="flex gap-1 bg-transparent border border-neutral-700  hover:bg-neutral-800 text-white w-[120px] h-[40px] rounded-md justify-center items-center text-sm transition-all cursor-pointer">Run Code <div className="w-[30px] h-[25px] rounded-md bg-[#09090B] border-neutral-700 border flex justify-center items-center text-neutral-400">F5</div> </button>
                <button className="flex text-black bg-neutral-50  hover:opacity-80 w-[120px] h-[40px] rounded-md justify-center items-center text-md transition-all cursor-pointer">Export</button>
            </div>
        </header>
    )
}
