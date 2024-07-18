
import '../../styles/HomePage.css'
import FooterContainer from './FooterContainer';
import HeaderContainer from './HeaderContainer';
import MainContainer from './MainContainer';
import StoryContainer from './StoryContainer';


function HomePage() {
    return (
        <div className="home-container">
            <HeaderContainer />
            <StoryContainer />
            <MainContainer />
        </div>
    )
}

export default HomePage;