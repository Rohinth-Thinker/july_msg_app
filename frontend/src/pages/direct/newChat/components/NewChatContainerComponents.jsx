import { useState } from "react";
import { useEffect } from "react";
import { BackButtonIcon } from "../../../../../public/icons/ProfilePageIcons";
import IntroProfile from "../../../List/IntroProfile";

function NewChatHeader() {

    return (
        <div className="message-container-header border-bottom" >
            <div className="left-section" >
                <HeaderBackButton />
            </div>
            <div className="middle-section center-element" >
                <span className="text-new-message" >New message</span>
            </div>
            <div className="right-section" >
                <button className="default-button-style next-button">Next</button>
            </div>
        </div>
    )
}

function HeaderBackButton() {
    return <BackButtonIcon />
}

function NewChatSearchContainer() {
    const [ list, setList ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            async function fetchFilteredUser() {
                setLoading(true);
                
                const response = await fetch(`http://localhost:3000/api/users?search=${searchText}`);
                const filteredUser = await response.json();
                setLoading(false);

                if (filteredUser.length > 0) {
                    setList(filteredUser);
                } else {
                    setList([])
                }
            }

            if (searchText) fetchFilteredUser();
        }, 300)

        return () => clearTimeout(debounceTimeout);

    }, [ searchText ])

    function handleSearchChange(e) {
        setSearchText(e.target.value);
    }

    return (
        <>
            <div className="new-chat-search-container border-bottom">
                <div className="text-to-container" > <span className="text-to">To:</span> </div>
                <div className="selected-users">
                    {/* <span>Rohinth_thinker</span> */}
                </div>
                <div className="search-container">
                    <input value={searchText} onChange={handleSearchChange} placeholder="Search..." />
                </div>
            </div>

            <SearchListContainer searchText={searchText} list={list} loading={loading} />
        </>
    )
}

function SearchListContainer({ loading, searchText, list }) {
    if (loading) return <p>Loading...</p>;
    if (!searchText) return <p>No accounts found</p>;
    if (list.length <= 0) return <p>No accounts found</p>;

    function introProfile() {
        return list.map((userProfile) => {
            return (
                <div key={userProfile._id} >
                    <IntroProfile userProfile={userProfile} >
                        <div className="rounded-checkbox"></div>
                    </IntroProfile>
                </div>
            )
        })
    }

    return (
        <div>
            { introProfile() }
        </div>
    )
}

export { NewChatHeader, NewChatSearchContainer, SearchListContainer };