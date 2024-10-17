import {CreateContainer, NotificationContainer, SelectivePostDropDown} from "./components/HeaderComponents";


function HeaderContainer() {

    async function handleLogoClick() {
        localStorage.removeItem('user');
        await fetch('/api/auth/logout');
        location.href = '/home';
    }

    return (
     <div className="header-container border-frame">
         <div className="header-left-side">
            <div className="logo-title-container" onClick={ handleLogoClick }>
                <img src="instagram.svg" className="logo-title" />
            </div>
           <SelectivePostDropDown />
         </div>
         <div className="header-right-side">
            <CreateContainer />
            <NotificationContainer />
         </div>
     </div>
    )
}

export default HeaderContainer;