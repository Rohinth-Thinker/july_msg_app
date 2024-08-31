import { useState } from "react";
import { useEffect } from "react";
import { useFileContext } from "./FileContext";

function Edit() {
    const { file, setFile } = useFileContext();
    const [ src, setSrc ] = useState(null);

    useEffect(() => {
        async function showImage() {
            let url = URL.createObjectURL(file);
            setSrc(url);

            return () => setFile(null);
        }
        if(file) showImage();
    }, [])
    
    console.log(file);

    if(!src) return <h1>HI</h1>;

    return <img src={src} width='90%' />
}


export default Edit;