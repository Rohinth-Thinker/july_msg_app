import SearchBar from "./SearchBar";
import '../../styles/List.css';
import IntroProfile from "./IntroProfile";
import { useState } from "react";
import { useParams } from "react-router-dom";
import userProfiles from "../../details/userProfile";

function FollowersPage() {

    const [ searchText, setSearchText ] = useState('');

    function handleChange(e) {
        setSearchText(e.target.value);
    }

    const { requestUsername } = useParams();
    
    const userProfile = userProfiles.find((user) => user.username === requestUsername);
    if (!userProfile) return <h1 className="mTop-45">Wrong Url</h1>

    const followersList = userProfile.followers;
    if ( followersList.length <= 0 ) return <h1 className="mTop-45">NO Followers</h1>;

    function introProfile() {
        let list;
        if ( !searchText ) list = followersList;
        else {
            list = followersList.filter((username) => username.toLowerCase().startsWith(searchText.toLowerCase()));
        }

        if ( list.length <= 0 ) return <h1>No results found</h1>

        const intro = list.map((followerUsername) => {
            const user = userProfiles.find((user) => user.username === followerUsername);
            const { _id, username, followers, profilePic } = user;
            
            return (
                <IntroProfile userProfile={{username, followers, profilePic}} key={_id} > 
                    <div className="intro-profile-button">
                        <button>Remove</button>
                    </div> 
                </IntroProfile>
            )
        })

        return intro;
    }


    return (
        <div className="followers-container mTop-45">
            <SearchBar searchText={searchText} handleChange={handleChange} />
              
            { introProfile() }
        </div>
    )
}

export default FollowersPage;