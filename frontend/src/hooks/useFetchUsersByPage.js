import { useEffect, useRef, useState } from "react";

function useFetchUsersByPage(searchText, page, setPage, fetchUrl) {

    const [ list, setList ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ hasMore, setHasMore ] = useState(true);
    let listLength = useRef(0);

    useEffect(() => {
        setList(null);
        setPage(1);
        setHasMore(true);
        listLength.current = 0;
    }, [ searchText ])

    useEffect(() => {
        let ignore = false;
        const debounceTimeout = setTimeout(() => {

            async function fetchFilteredUser() {
                try {
                    setLoading(true);
                    const response = await fetch(`${fetchUrl}?search=${searchText}&page=${page}`);
                    const { profiles, total } = await response.json();
                    
                    if (!ignore) {
                        listLength.current += profiles.length;
                        console.log(listLength.current, total);    
                        if (listLength.current === total) {
                            setHasMore(false);
                        }

                        if (profiles.length > 0) {
                            setList((l) => l ? [ ...l, ...profiles ] : profiles);
                        } else {
                            setList([]);
                        }
                    }

                    setLoading(false);

                } catch(err) {
                    if (!ignore) {
                        console.log(`${err.name} : ${err.message}`);
                        setLoading(false);      
                    }              
                }
            }
        
            fetchFilteredUser();

        }, 300)
            
        return () => {
            ignore = true;
            clearTimeout(debounceTimeout);
            setLoading(false);
        }

    }, [ searchText, page ])

    return [ list, loading, hasMore ];

}

export default useFetchUsersByPage;