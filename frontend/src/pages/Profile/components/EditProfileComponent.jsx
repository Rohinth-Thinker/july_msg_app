import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef } from "react";
import {storage} from '../../../firebase/firebase';


function ChangePhoto({ handleSetUserProfile }) {

    const inputRef = useRef(null);

    function handleChange(e) {
        inputRef.current.click();
    }


    async function uploadPhoto(pic) {
        const storageRef = ref(storage, `projects/insta/profile-pic/${pic.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, pic);
            console.log('Uploaded Successfull');

            const downloadUrl = await getDownloadURL(snapshot.ref);
            return downloadUrl;
        } catch(err) {
            console.log("Upload Failed, Try again");
            console.log(err);
        }
        
    }

    async function handleFileChange(e) {
        const pic = e.target.files[0];
        const url = await uploadPhoto(pic);

        console.log('Photo Selected');
        handleSetUserProfile({ userProfilePic : url });


        const updateResponse = await fetch('/api/users/profile/pic/update', {
            method : "PATCH",
            body : JSON.stringify({ filename: url }),
            headers : {
                "Content-Type" : "application/json",
            }
        })
    }

    return (
        <>
            <input ref={inputRef} type='file' accept='image/*' onChange={handleFileChange} name='profilePhoto' className='display-none' />
            <button onClick={handleChange}>Change photo</button>
        </>
    )
        

}

function ChangeWebsiteContainer({ website, handleWebsiteChange }) {

    return (
        <div className="change-website-main-container">
            <div className="change-website-container">
                <form className="website-form">
                    <label>Website</label>
                    <input className="website-input" type="text" value={website} onChange={handleWebsiteChange}
                        placeholder="Website" />
                </form>
            </div>
        </div>
    )
}

function ChangeBioContainer({ bio, handleBioChange }) {

    return (
        <div className="change-bio-main-container">
                <form className="change-bio-container">
                    <label>Bio</label>
                    <textarea className="bio-textarea" value={bio} maxLength={150} onChange={handleBioChange} 
                        placeholder="Set a Bio" />
                </form>
        </div>
    )
}

export { ChangePhoto, ChangeWebsiteContainer, ChangeBioContainer };