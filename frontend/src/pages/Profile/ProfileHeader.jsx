import { BackButtonIcon, SettingsIcon } from "../../../public/icons/ProfilePageIcons";
import { useAuthContext } from "../../context/AuthContext";

function ProfileHeader({username}) {
    const { authUser } = useAuthContext();

    function leftSectionIcon() {
        if ( authUser.username === username ) return <SettingsIcon />
        return <BackButtonIcon />
    }

    return (
        <div className="profile-header">
            <div className="profile-header-left-section" >
                {leftSectionIcon()}
            </div>
            <div className="profile-header-middle-section">
                <span>{username}</span>
            </div>
            <div className="profile-header-right-section"></div>
        </div>
    )
}

export default ProfileHeader;