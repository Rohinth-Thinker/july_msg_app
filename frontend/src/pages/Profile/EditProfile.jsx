import { useEffect } from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import LoadingIndicator from "../../comp/LoadingIndicator";
import { GenerateProfilePhoto } from "../../comp/ProfileGenerator";
import { useAuthContext } from "../../context/AuthContext";
import { ChangeBioContainer, ChangePhoto, ChangeWebsiteContainer } from "./components/EditProfileComponent";


function EditProfile() {

    const { authUser } = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const [ userProfile, setUserProfile ] = useState(null);
    const [ bio, setBio ] = useState('');
    const [ website, setWebsite ] = useState('');
    const [ isDisable, setIsDisable ] = useState(true);


    useEffect(() => {
        async function fetchUserProfile() {
            setLoading(true);

            const response = await fetch(`/api/users/${authUser.username}`);
            const profile = await response.json();
            setLoading(false);

            if (profile.error) {
                return;
            }
            setUserProfile(profile);
            setBio(profile.userBio);
            setWebsite(profile.userWebsite);
        }

        if (authUser) fetchUserProfile();
    }, [ authUser ])

    async function handleSubmit() {
        const response = await fetch("/api/users/profile/fields/update", {
            method : "PATCH",
            body : JSON.stringify({ bio, website }),
            headers : {
                "Content-Type" : "application/json",
            }
        })

        location.reload();
    }

    function handleSetUserProfile(updatedProp) {
        console.log({...userProfile, ...updatedProp});
        setUserProfile({...userProfile, ...updatedProp});
    }

    function handleBioChange(e) {
        if(isDisable) {
            setIsDisable(false);
        }
        setBio(e.target.value);
    }

    function handleWebsiteChange(e) {
        if(isDisable) {
            setIsDisable(false);
        }
        setWebsite(e.target.value);
    }

    if (loading) return <LoadingIndicator />
    if (!userProfile) return;

    return (
        <div className="edit-profile-container">

            <div className="change-photo-main-container">
                <div className="change-photo-container">
                    <div className="photo-container">
                        <GenerateProfilePhoto src={userProfile.userProfilePic} size={56} />
                    </div>
                    <div className="photo-details-container">
                        <span>disturbing_heart</span>
                        <ChangePhoto handleSetUserProfile={handleSetUserProfile} />
                    </div>
                </div>
            </div>

            <ChangeWebsiteContainer website={website} handleWebsiteChange={handleWebsiteChange} />

            <ChangeBioContainer bio={bio} handleBioChange={handleBioChange} />

            <div className="change-gender-container"></div>
            
            <div className="submit-button-container">
                <button className={isDisable ? 'disable' : ''} disabled={isDisable} onClick={handleSubmit} >Submit</button>
            </div>
        </div>
    )
}


export default EditProfile;
