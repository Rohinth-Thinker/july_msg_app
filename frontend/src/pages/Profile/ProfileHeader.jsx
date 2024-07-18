import { SettingsIcon } from "../../../public/icons/ProfilePageIcons";

function ProfileHeader() {
    return (
        <div className="profile-header">
            <div className="profile-header-left-section">
                <SettingsIcon />
            </div>
            <div className="profile-header-middle-section">
                <span>disturbing_heart</span>
            </div>
            <div className="profile-header-right-section"></div>
        </div>
    )
}

export default ProfileHeader;