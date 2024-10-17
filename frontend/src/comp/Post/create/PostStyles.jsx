
import { useMediaContext } from '../../../context/MediaContext';
import '../../../styles/CreateContainer.css';
import { PostStylesMainContainer, PostStylesHeader, PostStylesFooter } from './PostStylesComponents';

function PostStyles() {

    const { mediaFile } = useMediaContext();
    if(!mediaFile) {
        window.location.href = '/home';
        return;
    }

    return (
        <div className='post-styles-main-container'>
            <PostStylesHeader header={'New Post'} />
            <div className='pTop-45' >
                <PostStylesMainContainer media={mediaFile} />
            </div>
            <PostStylesFooter />
        </div>
    )
}

export default PostStyles;