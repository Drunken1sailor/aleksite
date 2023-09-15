import './App.css'
import {useEffect, useState} from 'react';
import Header from './components/Header';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';

function App() {
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
        setMousePosition(newX);
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
      />
      <Footer/>
    </>
  )
}

export default App
