import { useState, useRef, useEffect } from 'react';
import prokopjevaLenaSitePng from '../img/portfolio/prokopjeva-lena.ru.png';
import yachtingSpbsuSitePng from '../img/portfolio/yachting-spbsu_img.png';
import vueExamplePng from '../img/portfolio/vue-example.png';
import portgolioBgImg from '../img/portfolio/portfolioBg.png';
import workBgImg from '../img/portfolio/workBg.png';

interface PortfolioSectionProps {
    scrollPos:number;
    handleMouseDown:React.MouseEventHandler<HTMLDivElement>;
    handleTouchDown:React.TouchEventHandler<HTMLDivElement>;
    mousePosition:number;
    setMousePosition:React.Dispatch<React.SetStateAction<number>>;
    sliderScrollbarWidth:number;
    setSliderScrollbarWidth:React.Dispatch<React.SetStateAction<number>>;
    sliderScrollbarThumbWidth:number;
    setSliderScrollbarThumbWidth:React.Dispatch<React.SetStateAction<number>>;
}

const PortfolioSection:React.FC<PortfolioSectionProps> = (props) => {
    //props for scrolling slidebar
    const scrollPos = props.scrollPos;
    const handleMouseDown = props.handleMouseDown;
    const handleTouchDown = props.handleTouchDown;
    const mousePosition = props.mousePosition;
    const setMousePosition = props.setMousePosition;
    const sliderScrollbarWidth = props.sliderScrollbarWidth;
    const setSliderScrollbarWidth = props.setSliderScrollbarWidth;
    const sliderScrollbarThumbWidth = props.sliderScrollbarThumbWidth;
    const setSliderScrollbarThumbWidth = props.setSliderScrollbarThumbWidth;
    
    //works data
    const portfolio__works = Array.from({length: 8}, (_,index) => index);
    const workLinks = [
        'https://prokopjeva-lena.ru/',
        'https://drunken1sailor.github.io/yachting-spbsu-client-build/',
        'https://drunken1sailor.github.io/vue-example/'
    ];
    const workImages = [
        prokopjevaLenaSitePng,
        yachtingSpbsuSitePng,
        vueExamplePng
    ];
    const workNames = [
        'prokopjeva-lena.ru',
        'yachting-spbsu.ru',
        'vue-example'
    ];
    const workDescriptions = [
        'Website of artist Lena Prokopjeva',
        'Prototype-site of Saint Petersburgs yachting club ',
        'Prototype of landing page, developed with Vue.js' 
    ];

    //vars for scrolling and rotating functional
    const sliderScrollbarRef = useRef<HTMLDivElement|null>(null);  
    const sliderScrollbarThumbRef = useRef<HTMLDivElement|null>(null);  
    const portfolioWorksRef = useRef<HTMLDivElement|null>(null);
    const [portfolioWorksWidth, setPortofolioWorksWidth] = useState(0);

    useEffect(()=>{
        if(sliderScrollbarRef.current){
            setSliderScrollbarWidth(sliderScrollbarRef.current.clientWidth);
        }
        if(portfolioWorksRef.current){
            setPortofolioWorksWidth(portfolioWorksRef.current.clientWidth);
        }
        if(sliderScrollbarThumbRef.current){
            setSliderScrollbarThumbWidth(sliderScrollbarThumbRef.current.clientWidth);
        }
    },[window.innerWidth]);

    const [movementPercent, setMovementPercent] = useState(0);
    useEffect(()=>{
        setMovementPercent(mousePosition / (sliderScrollbarWidth-sliderScrollbarThumbWidth));
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

    //animatoin of works
    const works = document.getElementById('works');
    let animationDelays = Array.from({length:workElements.length},(_,index)=>index*0.3);
    const temp = animationDelays.slice(6);
    animationDelays = animationDelays.slice(0,7);
    animationDelays = temp.concat(animationDelays);

    //adaptive
    const portfolioElement = document.getElementById("portfolio");
    const elementRect = portfolioElement?.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    let portfolioTitleAnimation = false;

    if (elementRect) {
        const portfolioTop = elementRect.top + scrollTop;
        const portfolioBottom = elementRect.bottom + scrollTop;
        const portfolioHeight = portfolioBottom - portfolioTop;
        portfolioTitleAnimation = (scrollPos >= portfolioTop && scrollPos <= portfolioBottom-portfolioHeight*0.3);
   
   
        const worksRotationAnimation = (scrollPos>=portfolioTop);
        if(worksRotationAnimation){
            works?.classList.add('worksRotationAnimation');
            workElements.forEach(element=>{
                element.classList.add('workAppearanceAnimation')
            })
        }
    } 

    //scrollHandler functional
    const [isTouching, setIsTouching] = useState(false);
    const [startX, setStartX] = useState(0);
    const [endX, setEndX] = useState(0);
    const [touchPosition, setTouchPosition] = useState(0);
    const isPCVersion = window.innerWidth>1280;
    const handleTouchStart:React.TouchEventHandler<HTMLElement> = (e)=>{
        if (e.touches.length === 1) {
            setStartX(e.touches[0].clientX);
            setIsTouching(true);
          }
    }
    const handleTouchMove:React.TouchEventHandler<HTMLElement> = (e)=>{
        if(isTouching && e.touches.length === 1){
            const deltaX = e.touches[0].clientX - (startX||0);
            setTouchPosition(endX+deltaX);
            console.log('touchPos = ', touchPosition, '\ndeltaX = ', deltaX);
        }
    }
    const handleTouchEnd = ()=>{
        setIsTouching(false);
        setEndX(touchPosition);
    }
    const handleWheel = (event:WheelEvent)=>{
        event.preventDefault();
        let temp = mousePosition;
        temp += event.deltaY*0.3;
        if(temp>=0 && temp<=sliderScrollbarWidth-sliderScrollbarThumbWidth)
            setMousePosition(temp);
        else if(temp<0)
            setMousePosition(0);
        else setMousePosition(sliderScrollbarWidth-sliderScrollbarThumbWidth);
    }
    works?.addEventListener("wheel", handleWheel);
    workElements.forEach(element=>{
        element.addEventListener("wheel", handleWheel);
    });

    return (
        <section onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="section portfolio" id='portfolio'>
            <div className="portfolio__bg">
                <img className="main-img" src={portgolioBgImg} draggable="false"/>
            </div>
            <div className="container portfolio__container">
                <div className={`title portfolio__title ${portfolioTitleAnimation ? 'sectionTitleAnimationIn' : 'sectionTitleAnimationOut'}`}>
                    <h2>works</h2>
                </div>
                <div className="row portfolio__slider slider">
                    <div 
                        ref={portfolioWorksRef}
                        id='works'
                        className='row portfolio__works works'
                        style={{
                            transform: 
                            `
                            ${(movementPercent>0 && movementPercent<1 && isPCVersion)?
                                `rotateY(${-360*movementPercent}deg`:
                                (movementPercent<=0)?
                                    'rotateY(0)':
                                    'rotateY(-360deg)'
                            }
                            ${isPCVersion?
                                '':
                                `rotateY(${touchPosition*0.2}deg`
                            }
                            `
                        }}
                    >
                        {portfolio__works.map((work,index)=>(
                            <>
                            <a 
                                key={work}
                                className='column portfolio__column work'
                                href={workLinks[index]}
                                target='_blanc'
                                style={{animationDelay: `${animationDelays[index]}s`}}
                                onTouchStart={handleTouchStart}
                            >
                                {workLinks[index] ?
                                    ( 
                                    <>
                                        <div className="work__back"></div>
                                        <div className="work__content">
                                            <div className="work__bg">
                                                <img src={workBgImg}/>
                                            </div>
                                            <div className="work__img">
                                                <img src={workImages[index]} alt="work image" draggable="false"/>
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
                            ref={sliderScrollbarThumbRef}
                            className="scrollbar__thumb"
                            style={{left: (mousePosition<0) ? '0px': (mousePosition>sliderScrollbarWidth-sliderScrollbarThumbWidth) ? `${sliderScrollbarWidth-sliderScrollbarThumbWidth}px` : `${mousePosition}px` }}
                            // style={{left: `${mousePosition}px`}}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchDown}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PortfolioSection;