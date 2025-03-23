import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"

export const Output = () => {
  
  const output = useSelector((state:RootState) => state.code.output)
  const error = useSelector((state:RootState) => state.code.error)


  return (  
    <div>
        {error && <p className="m-3 text-lg text-red-500">Error: {error}</p>}
        {output && <p className="m-3 text-lg text-neutral-400">{output}</p>}
    </div>
  )
}
