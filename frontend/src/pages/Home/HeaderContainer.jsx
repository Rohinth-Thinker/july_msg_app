import {CreateContainer, NotificationContainer, SelectivePostDropDown} from "./components/HeaderComponents";


function HeaderContainer() {
    return (
     <div className="header-container border-frame">
         <div className="header-left-side">
            <div className="logo-title-container">
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