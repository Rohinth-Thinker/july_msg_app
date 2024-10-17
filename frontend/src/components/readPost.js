
async function readPost(fileId) {
    const imgResponse = await fetch(`/api/post/files/${fileId}`);
    const imgBlob = await imgResponse.blob();
    const url = URL.createObjectURL(imgBlob);
    return url;
}


export default readPost;