import { useState } from "react";

function useUploadPost() {
    const [ loading, setLoading ] = useState(false);

    const uploadPost = async (file, caption) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('media', file);
            formData.append('bucketName', 'uploadPost');

            const uploadResponse = await fetch("/api/upload/post", {
                method : "POST",
                body : formData,
            });
            const uploadResponseResult = await uploadResponse.json();
            if (uploadResponseResult.error) {
                return { status : false, msg : uploadResponseResult.error };
            }

            const { fileId } = uploadResponseResult;

            const storePostResponse = await fetch("/api/post/store", {
                method : "POST",
                body : JSON.stringify({ fileId, caption }),
                headers : {
                    "Content-Type" : "application/json",
                }
            });
            const storePostResponseResult = await storePostResponse.json();
            setLoading(false);
            if (uploadResponseResult.error) {
                return { status : false, msg : storePostResponseResult.error };
            }

            return { status : true };
                        
        } catch(err) {
            setLoading(false);
            throw err;
        }
    }

    return [ loading, uploadPost ];
}

export default useUploadPost;