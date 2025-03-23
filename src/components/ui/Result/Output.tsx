import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

export const Output = () => {
  const output = useSelector((state: RootState) => state.code.output)
  const error = useSelector((state: RootState) => state.code.error)

  if (!output && !error) {
    return <div className="flex justify-center h-[86vh] items-center"><h1 className="text-[40px] text-neutral-500  font-semibold ">Output</h1></div>
  }

  return (
    <div>
      {error && <p className="m-3 text-lg text-red-500">Error: {error}</p>}
      {!error && output && <p className="m-3 text-lg text-neutral-400">{output}</p>}

    </div>
  )
}
