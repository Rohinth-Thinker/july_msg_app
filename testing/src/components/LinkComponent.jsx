import { useRef } from "react";
import { Link } from "react-router-dom";
import { useFileContext } from "./FileContext";
import { useNavigate } from 'react-router-dom';


function LinkComponent() {

    const { setFile } = useFileContext();

    const ref = useRef(null);
    const navigate = useNavigate();

    function handleChange(e) {
        const file = ref.current.files[0];
        // console.log(JSON.stringify(file));
        
        setFile(file);
        navigate('/create/styles');
    }

    function handleClick(e) {
        e.preventDefault();
        ref.current.click();
        // console.log(ref.current);
    }

    return (
        <div>
            <input ref={ref} onChange={handleChange} type="file" name="media" style={{ display : 'none' }} />
            <Link to='/create/styles' href="/create/styles" onClick={handleClick}> LINK </Link>
        </div>
    )
}


export default LinkComponent;