import { useState, useRef, useEffect } from 'react';
import prokopjevaLenaSitePng from '../img/portfolio/prokopjeva-lena.ru.png';
import yachtingSpbsuSitePng from '../img/portfolio/prokopjeva-lena.ru.png';

interface PortfolioSectionProps {
    scrollPos:number;
    handleMouseDown:React.MouseEventHandler<HTMLDivElement>;
    handleMouseMove:React.MouseEventHandler<HTMLDivElement>;
    handleMouseUp:React.MouseEventHandler<HTMLDivElement>;
    mousePosition:number;
    dragging:boolean;
    sliderScrollbarWidth:number;
    setSliderScrollbarWidth:React.Dispatch<React.SetStateAction<number>>;
}

const PortfolioSection:React.FC<PortfolioSectionProps> = (props) => {
    const scrollPos = props.scrollPos;
    const handleMouseDown = props.handleMouseDown;
    const handleMouseMove = props.handleMouseMove;
    const handleMouseUp = props.handleMouseUp;
    const mousePosition = props.mousePosition;
    const sliderScrollbarWidth = props.sliderScrollbarWidth;
    const setSliderScrollbarWidth = props.setSliderScrollbarWidth;
    // const dragging = props.dragging;
    
    const portfolio__works = Array.from({length: 8}, (_,index) => index);
    const workLinks = [
        'https://github.com/Drunken1sailor?tab=repositories',
        'https://github.com/Drunken1sailor?tab=repositories'
    ];
    const workImages = [
        prokopjevaLenaSitePng,
        yachtingSpbsuSitePng
    ];
    const workNames = [
        'prokopjeva-lena.ru',
        'yachting-spbsu.ru'
    ];
    const workDescriptions = [
        'Website of artist Lena Prokopjeva',
        'Prototype-site of Saint Petersburgs yachting club ' 
    ];

    const portfolioTitleAnimation = (scrollPos >= 1500 && scrollPos <= 2200);

    const sliderScrollbarRef = useRef<HTMLDivElement|null>(null);

    
    const portfolioWorksRef = useRef<HTMLDivElement|null>(null);
    const [portfolioWorksWidth, setPortofolioWorksWidth] = useState(0);

    useEffect(()=>{
        if(sliderScrollbarRef.current){
            setSliderScrollbarWidth(sliderScrollbarRef.current.clientWidth);
        }
        if(portfolioWorksRef.current){
            setPortofolioWorksWidth(portfolioWorksRef.current.clientWidth);
        }
    },[]);

    const [movementPercent, setMovementPercent] = useState(0);
    useEffect(()=>{
        setMovementPercent(mousePosition / (sliderScrollbarWidth-40));
    },[mousePosition]);

    const workElements = document.querySelectorAll('.work') as NodeListOf<HTMLElement>;
    

    if (workElements) {
    const radius = portfolioWorksWidth/2; 
    const worksCount = portfolio__works.length;
    const angle = (2*Math.PI) / worksCount;

    workElements.forEach((work, index) => {
        const x = radius * Math.cos(angle * index - Math.PI/2);
        const z = -radius * Math.sin(angle * index - Math.PI/2);
        const rotationY = angle * index;

        work.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotationY}rad)`;
    });
    }

    return (
        <section className="section portfolio" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className="container portfolio__container">
                <div className={`title portfolio__title ${portfolioTitleAnimation ? 'sectionTitleAnimationIn' : 'sectionTitleAnimationOut'}`}>
                    <h2>works</h2>
                </div>
                <div className="row portfolio__slider slider">
                    <div 
                        ref={portfolioWorksRef}
                        className="row portfolio__works works"
                        style={{
                            transform: 
                            `
                            ${(movementPercent>0 && movementPercent<1)?
                                `rotateY(${-360*movementPercent}deg`:
                                ``}
                            `
                        }}
                    >
                        {portfolio__works.map((work,index)=>(
                            <>
                            <a 
                                key={work}
                                className="column portfolio__column work"
                                href={workLinks[index]}
                                target='_blanc'
                            >
                                {workLinks[index] ?
                                    ( 
                                    <>
                                        <div className="work__back"></div>
                                        <div className="work__content">
                                            <div className="work__img">
                                                <img src={workImages[index]} alt="work image" />
                                            </div>
                                            <div className="work__name">
                                                {workNames[index]}
                                            </div>
                                            <div className="work__description">
                                                {workDescriptions[index]}
                                            </div>
                                        </div>
                                    </>
                                    ):
                                    (
                                    <>
                                        <div className="work__back"></div>
                                        <div className="work__comingSoon work__content">
                                            <p>coming soon</p>
                                        </div>
                                    </>    
                                    )
                                }
                            </a>
                            </>
                        ))}
                    </div>
                    <div ref={sliderScrollbarRef} className="slider__scrollbar scrollbar">
                        <div 
                            className="scrollbar__thumb"
                            style={{left: (mousePosition<0) ? '0px': (mousePosition>sliderScrollbarWidth-40) ? `${sliderScrollbarWidth-40}px` : `${mousePosition}px` }}
                            // style={{left: `${mousePosition}px`}}
                            onMouseDown={handleMouseDown}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PortfolioSection;