import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { GenerateProfilePhoto } from "../../comp/ProfileGenerator";
import { ChangeBioContainer, ChangePhoto, ChangeWebsiteContainer } from "./components/EditProfileComponent";


function EditProfile() {

    const [ bio, setBio ] = useState('I am Rohinth');

    function handleBioChange(e) {
        setBio(e.target.value);
    }

    return (
        <div className="edit-profile-container">

            <div className="change-photo-main-container">
                <div className="change-photo-container">
                    <div className="photo-container">
                        <GenerateProfilePhoto size={56} />
                    </div>
                    <div className="photo-details-container">
                        <span>disturbing_heart</span>
                        <ChangePhoto />
                    </div>
                </div>
            </div>

            <ChangeWebsiteContainer />

            <ChangeBioContainer bio={bio} handleBioChange={handleBioChange} />

            <div className="change-gender-container"></div>
            
            <div className="submit-button-container">
                <button>Submit</button>
            </div>
        </div>
    )
}


export default EditProfile;
