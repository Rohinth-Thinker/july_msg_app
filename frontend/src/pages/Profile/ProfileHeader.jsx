import { BackButtonIcon, SettingsIcon } from "../../../public/icons/ProfilePageIcons";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function ProfileHeader({username}) {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    function navigateToPreviousPage() {
        navigate(-1);
    }

    function leftSectionIcon() {
        if ( authUser.username === username ) return <SettingsIcon />
        return <BackButtonIcon />
    }

    return (
        <div className="profile-header border-bottom">
            <div className="profile-header-left-section" onClick={navigateToPreviousPage} >
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