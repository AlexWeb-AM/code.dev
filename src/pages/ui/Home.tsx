import { CodeEditorComponent } from "../../components/ui/Editor/CodeEditorComponent"
import { CodeOutputComponent } from "../../components/ui/Result/CodeOutputComponent"
import { Header } from "../../components/ui/Header"

export const Home = () => {
  return (
    <div>
        <Header />
        <div className="w-full col-start-1 row-span-full row-start-1 hidden border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 md:block dark:[--pattern-fg:var(--color-white)]/20">
            <div className="container flex">
                <CodeEditorComponent />
                <CodeOutputComponent />
            </div>
        </div>
    </div>
  )
}
