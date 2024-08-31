
async function readPost(fileId) {
    const imgResponse = await fetch(`http://localhost:3000/api/post/files/${fileId}`);
    const imgBlob = await imgResponse.blob();
    const url = URL.createObjectURL(imgBlob);
    return url;
}


export default readPost;