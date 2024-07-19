
const userProfiles = [
    {
        _id : 'profile(1)',
        username : 'rohinth_thinker',
        profilePic : 'pic1.jpg',
        bio : `I Am,
A man who has Everything and Nothing
🤥`,
        post : ['post(1)', 'post(2)', 'post(3)'],
        followers : ['disturbing_heart', 'ms_dhoni'],
        following : ['ms_dhoni'],
    },
    {
        _id : 'profile(2)',
        username : 'disturbing_heart',
        profilePic : '',
        bio : '',
        post : ['post(4)', 'post(5)'],
        followers : [],
        following : ['rohinth_thinker'],
    },
    {
        _id : 'profile(3)',
        username : 'ms_dhoni',
        profilePic : '',
        bio : '',
        post : [],
        followers : ['rohinth_thinker'],
        following : ['rohinth_thinker'],
    },
];


export default userProfiles;