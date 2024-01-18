import './App.css'
import {useEffect, useState} from 'react';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';
import bodyBg from './img/bodyBg.png';

function App() {
  //functional for portfolio's scrolling by mouse
  const [sliderScrollbarWidth, setSliderScrollbarWidth] = useState(0);
  const [sliderScrollbarThumbWidth, setSliderScrollbarThumbWidth] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const handleMouseDown:React.MouseEventHandler<HTMLDivElement> = (e) => {
    setDragging(true);
    setStartX(e.clientX - mousePosition);
  }
  const handleMouseMove:React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(dragging){
        const newX = e.clientX - startX;

        if(newX>0 && newX<sliderScrollbarWidth-sliderScrollbarThumbWidth) 
          {setMousePosition(newX)} 
        else{
          if(newX<=0) setMousePosition(0);
          if(newX>=sliderScrollbarWidth-sliderScrollbarThumbWidth) setMousePosition(sliderScrollbarWidth-sliderScrollbarThumbWidth)
        }
    }
  }
  const handleMouseUp:React.MouseEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  }
  
  const handleTouchDown:React.TouchEventHandler<HTMLDivElement>= (e) => {
    setDragging(true);
    setStartX(e.touches[0].clientX - mousePosition);
  }
  const handleTouchMove:React.TouchEventHandler<HTMLDivElement> = (e) => {
    if(dragging){
        const newX = e.touches[0].clientX - startX;

        if(newX>0 && newX<sliderScrollbarWidth-sliderScrollbarThumbWidth) 
          {setMousePosition(newX)} 
        else{
          if(newX<=0) setMousePosition(0);
          if(newX>=sliderScrollbarWidth-sliderScrollbarThumbWidth) setMousePosition(sliderScrollbarWidth-sliderScrollbarThumbWidth)
        }
    }
  }
  const handleTouchUp:React.TouchEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  }
  

  //page's scroll monitoring
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = () => {
      requestAnimationFrame(() => {
          setScrollPos(window.scrollY);
      });
  }
  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  return (
    <div onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} onTouchEnd={handleTouchUp}>
      <div className="body__background">
        <img src={bodyBg}/>
      </div>
      {/* <div className="scrollPosCount">
          {scrollPos}
      </div> */}
      <Header scrollPos={scrollPos}/>
      <SkillsSection scrollPos={scrollPos}/>
      <PortfolioSection  
        scrollPos={scrollPos} 
        handleMouseDown={handleMouseDown}
        handleTouchDown={handleTouchDown}
        mousePosition={mousePosition}
        setMousePosition={setMousePosition}
        sliderScrollbarWidth={sliderScrollbarWidth}
        setSliderScrollbarWidth={setSliderScrollbarWidth}
        sliderScrollbarThumbWidth={sliderScrollbarThumbWidth}
        setSliderScrollbarThumbWidth={setSliderScrollbarThumbWidth}
      />
      <Footer/>
    </div>
  )
}

export default App
