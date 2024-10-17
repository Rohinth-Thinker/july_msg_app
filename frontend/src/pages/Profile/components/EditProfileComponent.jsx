
function ChangePhoto() {

    return <button>Change photo</button>

}

function ChangeWebsiteContainer() {

    return (
        <div className="change-website-main-container">
            <div className="change-website-container">
                <form className="website-form">
                    <label>Website</label>
                    <input className="website-input" type="text" placeholder="Website" />
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
                    <textarea className="bio-textarea" value={bio} maxLength={150} onChange={handleBioChange} />
                </form>
        </div>
    )
}

export { ChangePhoto, ChangeWebsiteContainer, ChangeBioContainer };