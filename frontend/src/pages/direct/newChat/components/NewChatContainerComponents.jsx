import { useRef, useState } from "react";
import { useEffect } from "react";
import CheckMarkIcon from "../../../../../public/icons/CheckMark";
import { BackButtonIcon } from "../../../../../public/icons/ProfilePageIcons";
import IntroProfile from "../../../List/IntroProfile";
import { RxCross2 } from "react-icons/rx";
import useCreateConversation from "../../../../hooks/useCreateConversation";
import useFetchUsersByPage from "../../../../hooks/useFetchUsersByPage";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import LoadingIndicator from "../../../../comp/LoadingIndicator";


function NewChatHeader({ users }) {

    const [ loading, createConversation ] = useCreateConversation();

    const isEmpty = users.length <= 0;

    async function handleNextClick() {
        const response = await createConversation(users);
        if(!response.status) {
            console.log(response.msg);
            return;
        }

        const { conversationId } = response;

        location.href = `/direct/t/${conversationId}`;
    }

    return (
        <div className="message-container-header border-bottom" >
            <div className="left-section" >
                <HeaderBackButton />
            </div>
            <div className="middle-section center-element" >
                <span className="text-new-message" >New message</span>
            </div>
            <div className="right-section" >
                <button onClick={handleNextClick} className={`default-button-style next-button ${isEmpty ? 'disabled-button' : ''}`}
                    disabled={isEmpty ? true : false}>Next</button>
            </div>
        </div>
    )
}

function HeaderBackButton() {
    return <BackButtonIcon />
}

function NewChatSearchContainer({selectedUsers, handleSelection}) {
    // const [ list, setList ] = useState([]);
    // const [ loading, setLoading ] = useState(false);
    const [ searchText, setSearchText ] = useState('');
    const [ page, setPage ] = useState(1)
    const scrollContainerRef = useRef();
    const lastElementRef = useRef();

    const [ list, loading, hasMore  ] = useFetchUsersByPage(searchText, page, setPageNumber, `/api/users`);
    useIntersectionObserver([list], lastElementRef, incrementPage, 0.5);

    function setPageNumber(number) {
        setPage(number);
    }

    function incrementPage() {
        if (hasMore) {
            console.log('clicked');
            setPage(page + 1);
        }
    }
        

    // useEffect(() => {
    //     const debounceTimeout = setTimeout(() => {
    //         async function fetchFilteredUser() {
    //             setLoading(true);
                
    //             const response = await fetch(`/api/users?search=${searchText}`);
    //             const filteredUser = await response.json();
    //             console.log(filteredUser);
    //             setLoading(false);

    //             if (filteredUser.profiles.length > 0) {
    //                 setList(filteredUser.profiles);
    //             } else {
    //                 setList([])
    //             }
    //         }

    //         if (searchText) fetchFilteredUser();
    //     }, 300)

    //     return () => clearTimeout(debounceTimeout);

    // }, [ searchText ])

    useEffect(() => {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }, [ selectedUsers ])

    function handleSearchChange(e) {
        setSearchText(e.target.value);
    }

    return (
        <>
            <div className="new-chat-search-container border-bottom">
                <div className="text-to-container" > <span className="text-to">To:</span> </div>
                <div ref={scrollContainerRef} className="scroll-container">
                    <div className="selected-users-container">
                        <ListSelectedUsers users={selectedUsers} handleSelection={handleSelection} />
                    </div>
                    <div className="search-container">
                        <input value={searchText} onChange={handleSearchChange} placeholder="Search..." />
                    </div>
                </div>
            </div>

            <SearchListContainer searchText={searchText} list={list} lastElementRef={lastElementRef} loading={loading} selectedUsers={selectedUsers} handleSelection={handleSelection} />
        </>
    )
}

function SearchListContainer({ loading, searchText, list, lastElementRef, selectedUsers, handleSelection }) {
    if (!searchText) return <p>No accounts found</p>;
    if (!list) return;
    if (list.length <= 0) return <p>No accounts found</p>;

    function introProfile() {
        return list.map((userProfile, index) => {
            return (
                <div ref={ (list.length === index + 1) ? lastElementRef : null } key={userProfile._id}>
                    <MakeIntroProfile userProfile={userProfile} selectedUsers={selectedUsers} handleSelection={handleSelection} />
                </div>
            )
        })
    }

    return (
        <div>
            { introProfile() }
            { loading && <LoadingIndicator /> }
        </div>
    )
}

export { NewChatHeader, NewChatSearchContainer, SearchListContainer };

function ListSelectedUsers({ users, handleSelection }) {
    const usersList = users.map((username) => {
        return (
            <div className="selected-user" key={username}>
                <span>{ username }</span>
                <div onClick={() => handleSelection(username)} className="wrong-icon">
                    <RxCross2 />
                </div>
            </div>
        )
    })

    return usersList;
}


function MakeIntroProfile({ userProfile, selectedUsers, handleSelection }) {

    let isSelected = selectedUsers.includes(userProfile.username);

    return (
        <div key={userProfile._id} >
                    <IntroProfile userProfile={userProfile} >
                        <div onClick={ () => handleSelection(userProfile.username) } className={`rounded-checkbox ${isSelected ? 'selected' : ''}`}>
                            { isSelected && <CheckMarkIcon /> }
                        </div>
                    </IntroProfile>
                </div>
    )
}