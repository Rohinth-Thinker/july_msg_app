import { FaUser } from "react-icons/fa";

function Story() {
    return (
        <div className="story-container">
            <div className="story-pic-border">
                <div className="story-profile-pic-container WH-56">
                    <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                    {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                </div>
            </div>

            <span className="story-username">Your story</span>
        </div>
    )
}

export default Story;