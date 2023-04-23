import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import NavbarComponent from './components/nav.js';
import HomePage from './components/homepage';
import ContactMe from './components/contact';
import IntroPage from './components/introPage';
import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import Saly from "./img/Saly.png"
import $ from 'jquery';
import Loader from './components/pageLoader.js';


function App() {

const [currentComponentIndex, setCurrentComponentIndex] =  useState(0);
const [isScrolling, setIsScrolling] =  useState(false);
const [isPageLoading, setIsPageLoading] = useState(true);
const [showPage1, setShowPage1] = useState(true);
const [showPage2, setShowPage2] = useState(false);
const [showPage3, setShowPage3] = useState(false);
const [isScrollingDown, setIsScrollingDown] = useState(true);


console.log("Current Component Index Value: " + currentComponentIndex);
const totalComponents = 3;


const waitForLoaderUI = () => {
  setTimeout(function(){
    setIsPageLoading(false);
  }, 5000)
}

useEffect(() => {
    switch (currentComponentIndex){
      case 0:
        setShowPage2(false);
        setShowPage3(false);
        setTimeout(setShowPage1(true), 1000);
        break;
      
      case 1:
        setShowPage1(false);
        setShowPage3(false);
        setTimeout(setShowPage2(true), 1000);
        break;

      case 2:
        setShowPage1(false);
        setShowPage2(false);        
        setTimeout(setShowPage3(true), 1000);
        break;
      
    }
}, [currentComponentIndex])


var scrollTimeout;
$(window).on('mousewheel', function(event) {
    if(isScrolling) {    
        return;
    }
    setIsScrolling(true);
    console.log("Scrolling Current Component Index: " + currentComponentIndex)

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        console.log('Scroll ended');
        setIsScrolling(false)
    }, 800);

    if (event.originalEvent.wheelDelta >= 0) {
      simulateScrollUp();
    }
    else {
      simulateScrollDown();
  }
});

const simulateScrollDown = () => {
  console.log('Scroll  direction down');
  if(currentComponentIndex < totalComponents - 1) {
      console.log("Current Component Index: " + currentComponentIndex)                
      setIsScrollingDown(true);
      setCurrentComponentIndex (currentComponentIndex + 1) 
      console.log("Current updated component index: " + currentComponentIndex)
  }  
}

const simulateScrollUp = () => {
  console.log('Scroll direction up');
  if(currentComponentIndex > 0) {        
      console.log("Current Component Index: " + currentComponentIndex)      
      setIsScrollingDown(false);
      setCurrentComponentIndex (currentComponentIndex - 1);  
      console.log("Current updated component index: " + currentComponentIndex)
  }  
}

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);

// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;

function startTouch(e) {
  initialX = e.touches[0].clientX;
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      // swiped left
      console.log("swiped left");
    } else {
      // swiped right
      console.log("swiped right");
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      simulateScrollDown();
      console.log("swiped up");
    } else {
      // swiped down
      simulateScrollUp();
      console.log("swiped down");
    }  
  }

  initialX = null;
  initialY = null;

  e.preventDefault();
};

return (
    <div className="App">
      {waitForLoaderUI()}
      {isPageLoading && <Loader/>}
      <NavbarComponent/>
      <IntroPage show = {showPage1} isScrollDown = {isScrollingDown}/>
      <HomePage show = {showPage2} isScrollDown = {isScrollingDown}/>
      <ContactMe show = {showPage3} isScrollDown = {isScrollingDown}/>

      {/* <div onClick={() => simulateScrollDown()} className='scroll-down-arrow'>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_231_12)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.82646 13.8134C3.60346 16.274 3.6 19.4476 3.6 24C3.6 28.5523 3.60346 31.7261 3.82646 34.1866C4.04498 36.5976 4.45138 37.9685 5.04694 39C5.99482 40.6418 7.35818 42.0053 9 42.953C10.0315 43.5487 11.4023 43.955 13.8134 44.1734C16.274 44.3966 19.4476 44.4 24 44.4C28.5523 44.4 31.7261 44.3966 34.1866 44.1734C36.5976 43.955 37.9685 43.5487 39 42.953C40.6418 42.0053 42.0053 40.6418 42.953 39C43.5487 37.9685 43.955 36.5976 44.1734 34.1866C44.3966 31.7261 44.4 28.5523 44.4 24C44.4 19.4476 44.3966 16.274 44.1734 13.8134C43.955 11.4023 43.5487 10.0315 42.953 9C42.0053 7.35818 40.6418 5.99482 39 5.04694C37.9685 4.45138 36.5976 4.04498 34.1866 3.82646C31.7261 3.60346 28.5523 3.6 24 3.6C19.4476 3.6 16.274 3.60346 13.8134 3.82646C11.4023 4.04498 10.0315 4.45138 9 5.04694C7.35818 5.99482 5.99482 7.35818 5.04694 9C4.45138 10.0315 4.04498 11.4023 3.82646 13.8134ZM40.8 1.92923C37.4585 0 32.9724 0 24 0C15.0277 0 10.5415 0 7.2 1.92923C5.01091 3.1931 3.1931 5.01091 1.92924 7.2C0 10.5415 0 15.0277 0 24C0 32.9724 0 37.4585 1.92924 40.8C3.1931 42.989 5.01091 44.8068 7.2 46.0709C10.5415 48 15.0277 48 24 48C32.9724 48 37.4585 48 40.8 46.0709C42.989 44.8068 44.8068 42.989 46.0709 40.8C48 37.4585 48 32.9724 48 24C48 15.0277 48 10.5415 46.0709 7.2C44.8068 5.01091 42.989 3.1931 40.8 1.92923Z" fill="#8E8E8E"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 13.3195C24.9941 13.3195 25.8 14.1254 25.8 15.1195V28.0538L29.9273 23.9267C30.6302 23.2238 31.7698 23.2238 32.4727 23.9267C33.1757 24.6298 33.1757 25.7693 32.4727 26.4722L25.2727 33.6722C24.5698 34.3752 23.4301 34.3752 22.7272 33.6722L15.5272 26.4722C14.8243 25.7693 14.8243 24.6298 15.5272 23.9267C16.2301 23.2238 17.3699 23.2238 18.0728 23.9267L22.2 28.0541V15.1195C22.2 14.1254 23.0059 13.3195 24 13.3195Z" fill="#EB9DD0"/>
        </g>
        <defs>
        <clipPath id="clip0_231_12">
        <rect width="48" height="48" fill="white"/>
        </clipPath>
        </defs>
        </svg>
      </div> */}

      {/* <img src={Saly} className="img-end"/> */}
    </div>
  );
}

export default App;

