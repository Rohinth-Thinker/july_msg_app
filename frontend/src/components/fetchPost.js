
async function fetchPost(id) {
    const postResponse = await fetch(`/api/post/${id}`);
    const post = await postResponse.json();
    if (post.error) {
        return null;
    }

    return post.postDetails;
}


export default fetchPost;