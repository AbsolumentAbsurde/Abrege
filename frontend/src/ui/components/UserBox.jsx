import { createContext, useContext, useState } from "react";
import DOMPurify from "dompurify";

const inputUserContext = createContext(null);

const InputUser = ({children}) => {
    const [ inputText, setInputText ] = useState("");
    const [ outputText, setOuputText ] = useState("");

    return (
        <inputUserContext.Provider value={{ inputText, setInputText, outputText, setOuputText}}>
            {children}
        </inputUserContext.Provider>
    );
};

const useInputUser = () => {
    const context = useContext(inputUserContext);

    if(!InputUser) {
        throw new Error("Error with Context");
    }

    return context;
};

function ClientBox(props) {
    const { setInputText } = useInputUser();

    const testInput = (e) => {
        setInputText(DOMPurify.sanitize(e.target.value.replace(/[^a-zA-Z0-9\u00C0-\u017F\s.,!?-]/g, "")));
    };
    
    return (
        <textarea name="TextZone" onChange={testInput} className='flex justify-center items-center bg-zinc-600 h-52 w-80 border-black border-4 rounded-2xl xl:h-64 xl:w-[40rem] text-white overflow-y-auto'/>
    );
}

function TriggerButton(props) {
    const { inputText, setOuputText } = useInputUser();

    const handleUserInput = async () => {
        const response = await fetch("http://localhost:3000/api/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputText }),
        });

        const data = await response.json();

        document.getElementById("AItextbox").value = data.summary;
    }

    return (
        <button onClick={handleUserInput} className="flex justify-center items-center h-10 w-24 bg-zinc-600 rounded-2xl border-4 border-black text-white text-xl font-bold hover:bg-white hover:text-black">Abrège</button>
    );
}

function AreaText(props) {
    const { outputText } = useInputUser(inputUserContext);

    return (
        <textarea id={props.id} disabled className='flex justify-center items-center bg-zinc-600 h-52 w-80 border-black border-4 rounded-2xl xl:h-64 xl:w-[40rem] text-white overflow-y-auto'/>
    );
}

function ButtonCopy(props) {
    const handleCopy = () => {
        const copyText = document.getElementById("AItextbox");

        copyText.select();
        navigator.clipboard.writeText(copyText.value);
    };

    return (
        <button onClick={handleCopy} className="flex justify-center items-center h-10 w-24 bg-zinc-600 rounded-2xl border-4 border-black text-white text-xl font-bold hover:bg-white hover:text-black">Copy</button>
    );
}

function UserBox() {
    return (
        <div className='flex flex-col justify-center items-center gap-7 xl:gap-16 '>
                <InputUser>
                    <div className="flex flex-col items-center top-20 gap-3">
                        <ClientBox/>
                        <TriggerButton/>
                    </div>
                    <div className='flex h-[0.10rem] w-full bg-white'/>
                    <div className="flex flex-col items-center top-20 gap-3">
                        <AreaText id="AItextbox"></AreaText>
                        <ButtonCopy/>
                    </div>
                </InputUser>
        </div>
    );
}

export default UserBox;
