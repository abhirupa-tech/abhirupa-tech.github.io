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
    </div>
  );
}

export default App;

