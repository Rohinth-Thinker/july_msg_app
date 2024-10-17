import { FaUser } from "react-icons/fa";
import { GenerateProfilePhoto, GenerateStoryStyle } from "../../comp/ProfileGenerator";

function Story() {
    return (
        <div className="story-container">
            <GenerateStoryStyle storyType={'unseen'}>
                <GenerateProfilePhoto size={56} />
            </GenerateStoryStyle>

            <span className="story-username">Your story</span>
        </div>
    )
}

export default Story;