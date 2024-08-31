
async function fetchPost(id) {
    const postResponse = await fetch(`http://localhost:3000/api/post/${id}`);
    const post = await postResponse.json();
    if (post.error) {
        return null;
    }

    return post.postDetails;
}


export default fetchPost;