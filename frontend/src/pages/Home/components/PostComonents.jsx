import { OptionIcon } from "../../../../public/icons/Post";
import { Link } from'react-router-dom';

function PostOptionContainer() {

    function handleClick() {
        console.log('Rohinth');
    }

    return (
        <>
            <div onClick={handleClick} >
                <OptionIcon />
            </div>
        </>
    )
}


export { PostOptionContainer };