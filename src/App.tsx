import './App.css'
import {useEffect, useState} from 'react';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';

function App() {
  const [sliderScrollbarWidth, setSliderScrollbarWidth] = useState(0);

  const [scrollPos, setScrollPos] = useState(0);

  const [dragging, setDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState(0);
  const [startX, setStartX] = useState(0);
  const handleMouseDown:React.MouseEventHandler<HTMLDivElement> = (e) => {
    setDragging(true);
    setStartX(e.clientX - mousePosition);
    console.log(dragging);
  }
  const handleMouseMove:React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(dragging){
        const newX = e.clientX - startX;

        if(newX>0 && newX<sliderScrollbarWidth-40) 
          {setMousePosition(newX)} 
        else{
          if(newX<=0) setMousePosition(0);
          if(newX>=sliderScrollbarWidth-40) setMousePosition(sliderScrollbarWidth-40)
        }
    }
  }
  const handleMouseUp:React.MouseEventHandler<HTMLDivElement> = () => {
    setDragging(false);
  }

  useEffect(()=>{
    const handleScroll = () => {
        requestAnimationFrame(() => {
            setScrollPos(window.scrollY);
        });
    }
    window.addEventListener('scroll',handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  return (
    <>
      <div className="scrollPosCount">
          {scrollPos}
      </div>
      <Header scrollPos={scrollPos}/>
      <SkillsSection scrollPos={scrollPos}/>
      <PortfolioSection  
        scrollPos={scrollPos} 
        handleMouseDown={handleMouseDown} 
        handleMouseMove={handleMouseMove} 
        handleMouseUp={handleMouseUp}
        mousePosition={mousePosition}
        dragging={dragging}
        sliderScrollbarWidth={sliderScrollbarWidth}
        setSliderScrollbarWidth={setSliderScrollbarWidth}
      />
      <Footer/>
    </>
  )
}

export default App
