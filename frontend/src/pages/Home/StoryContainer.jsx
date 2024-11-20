import { useEffect, useState } from "react";
import LoadingIndicator from "../../comp/LoadingIndicator";
import { useAuthContext } from "../../context/AuthContext";
import Story from "./Story";

function StoryContainer() {
    const { authUser } = useAuthContext();
    const [ loading, setLoading ] = useState(false);
    const [ userProfile, setUserProfile ] = useState({});

    useEffect(() => {
        async function userProfile() {
            setLoading(true);
            const response = await fetch(`/api/users/${authUser.username}`);
            const result = await response.json();
            setLoading(false);
            setUserProfile(result);
            console.log(result);
        }

        userProfile();
    }, [authUser])

    if (loading) return <LoadingIndicator />;

    return (
        <div className="stories-container">
            <div style={{ display : 'flex', alignItems : 'center' }}>
                <Story src={userProfile.userProfilePic} />
            </div>

            <Story />
            <Story />
            
        </div>
    )
}

export default StoryContainer;