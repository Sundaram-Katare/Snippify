import LanguageBar from "./LanguageBar";
import SnippetCard from "./SnippetCard";


export default function Catolouge() {
    return (
        <>
            <div className="flex flex-col">
                <LanguageBar />
                <div className="grid grid-cols-3 gap-5 mt-8">
                  <SnippetCard />
                </div>
            </div>
        </>
    )
}