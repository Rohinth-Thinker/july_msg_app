import { useState } from "react";
import { FaUser } from "react-icons/fa";

function CommentsInputContainer({ submit }) {

    const [ text, setText ] = useState('');
    const isEmpty = !text || !(text.replaceAll(' ', ''));

    async function handleClick() {
        await submit(text);
        setText('');
    }

    return (
        <div className="comments-input-container border-top">
            <div className="left-section" >

                <div className="pic-profile">
                    <div className="story-profile-pic-container WH-38">
                        <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                        {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                    </div>
                </div>

            </div>

            <div className="middle-section">
                <textarea placeholder="Add a comment..."  value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            
            <div className="right-section">
                { !isEmpty && <button className="default-button-style" 
                    onClick={() => handleClick(text)} > Post </button> }
            </div>
        </div>
    )
}

export { CommentsInputContainer };