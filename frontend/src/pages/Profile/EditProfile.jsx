import { useState } from "react";
import { FaUser } from "react-icons/fa";


function EditProfile() {

    const [ bio, setBio ] = useState('I am Rohinth');

    return (
        <div className="edit-profile-container">

            <div className="change-photo-main-container">
                <div className="change-photo-container">
                    <div className="photo-container">
                        <div className="story-profile-pic-container WH-56">
                            <FaUser style={{color:"white", width:'72%', height:'72%'}} />
                            {/* <img src="profile-pic.jpg" style={{width: "100%", height: "100%", borderRadius: '50%'}} /> */}
                        </div>  
                    </div>
                    <div className="photo-details-container">
                        <span>disturbing_heart</span>
                        <button>Change photo</button>
                    </div>
                </div>
            </div>

            <div className="change-website-main-container">
                <div className="change-website-container">
                    <form className="website-form">
                        <label>Website</label>
                        <input className="website-input" type="text" placeholder="Website" />
                    </form>
                </div>
            </div>

            <div className="change-bio-main-container">
                <form className="change-bio-container">
                    <label>Bio</label>
                    <textarea className="bio-textarea" value={bio} maxLength={150} onChange={(e) => setBio(e.target.value)} />
                </form>
            </div>
            <div className="change-gender-container"></div>
            <div className="submit-button-container">
                <button>Submit</button>
            </div>
        </div>
    )
}


export default EditProfile;
