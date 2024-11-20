import { useRef } from "react";

function ChangePhoto({ handleSetUserProfile }) {

    const inputRef = useRef(null);

    function handleChange(e) {
        inputRef.current.click();
    }

    async function handleFileChange(e) {
        const pic = e.target.files[0];
        
        const formData = new FormData();
        formData.append('media', pic);

        const uploadResponse = await fetch('/api/upload/profile-pic', {
            method : "POST",
            body : formData,
        })

        if (!uploadResponse.ok) {
            return;
        }
        const { filename } = await uploadResponse.json();

        const updateResponse = await fetch('/api/users/profile/pic/update', {
            method : "PATCH",
            body : JSON.stringify({ filename }),
            headers : {
                "Content-Type" : "application/json",
            }
        })
        handleSetUserProfile({ userProfilePic : filename });
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