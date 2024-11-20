import { FaUser } from "react-icons/fa";
import { GenerateProfilePhoto, GenerateStoryStyle } from "../../comp/ProfileGenerator";

function Story({ src }) {
    return (
        <div className="story-container">
            <GenerateStoryStyle storyType={'unseen'}>
                <GenerateProfilePhoto src={src} size={56} />
            </GenerateStoryStyle>

            <span className="story-username">Your story</span>
        </div>
    )
}

export default Story;