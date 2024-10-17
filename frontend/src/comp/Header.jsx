import { useNavigate } from "react-router-dom";
import { BackButtonIcon } from "../../public/icons/ProfilePageIcons";

function Header({ header, children }) {

    const navigate = useNavigate();

    function navigateToPreviousPage() {
        navigate(-1);
    }

    return (
        <div className="profile-header border-bottom">
            <div className="profile-header-left-section" onClick={navigateToPreviousPage} >
                <BackButtonIcon />
            </div>
            <div className="profile-header-middle-section">
                <span className="font-size-17"> {header} </span>
            </div>
            <div className="profile-header-right-section"> { children } </div>
        </div>
    )
}

export { Header }