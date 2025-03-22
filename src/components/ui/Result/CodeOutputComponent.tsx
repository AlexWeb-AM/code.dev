import { Output } from "./Output"
import { OutputHeader } from "./OutputHeader"

export const CodeOutputComponent = () => {
  return (
    <div className="h-screen  w-1/2 border-r border-neutral-500 bg-[#09090B]">
        <OutputHeader />
        <Output />
    </div>
  )
}
