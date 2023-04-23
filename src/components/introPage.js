
import "../styles/introPage.css"
import "../styles/animation.css"
import Container from 'react-bootstrap/Container';
import { useState, useEffect, useRef } from 'react';


function IntroPage({
    show,
    isScrollDown}) {  

    console.log("Value show:"+show)
    const [shouldRender, setRender] = useState(show);

    useEffect(() => {
        if (show) setRender(true);
      }, [show]);
    
      const onAnimationEnd = () => {
        if (!show) setRender(false);
      };

    return(
        shouldRender && (
        <Container fluid className="IntroCaption" id="IntroPage"
        style={{ animation: `${show 
            ? (isScrollDown ? "ComponentAppearFromBottom 2s forwards" : "ComponentAppearFromTop 2s forwards")
            : (isScrollDown ? "ComponentFadeAwayToTop 1s forwards" : "ComponentFadeAwayToBottom 8s forwards")} ` }}
        onAnimationEnd={onAnimationEnd}>
                <span className="caption-Header caption-white" color='blue'>i actualize ideas </span><br/>
                <span className="caption-Header caption-white">to create </span>
                <span className="caption-Header caption-color">digital experiences </span><br/>
                <span className="caption-Header caption-underline caption-white">that matter</span>

                <div className="schedule-mentoring mobile-only">
                    <a href="https://calendly.com/abhirupamitra-tech/career-coaching">SCHEDULE A 1:1 MENTORING</a>
                </div>
        </Container>)
             
    )
}


export default IntroPage;