import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaContext } from "../../context/MediaContext";

function CreateStory() {

    // const navigate = useNavigate();
    const { mediaFile } = useMediaContext();
    if (!mediaFile) {
        window.location.href = '/home';
        return;
    }

    // useEffect(() => {
    //     if (!mediaFile) {
    //         navigate('/home');
    //     }
    // }, [])
    
    
    return (
        <>
            <div>
                <h1>HI I AM ROHINTH...lol</h1>
            </div>
        </>
    )
}

export default CreateStory;