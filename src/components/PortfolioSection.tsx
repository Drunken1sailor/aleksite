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
}

const PortfolioSection:React.FC<PortfolioSectionProps> = (props) => {
    const scrollPos = props.scrollPos;
    const handleMouseDown = props.handleMouseDown;
    const handleMouseMove = props.handleMouseMove;
    const handleMouseUp = props.handleMouseUp;
    const mousePosition = props.mousePosition;
    const dragging = props.dragging;
    
    const portfolio__works = Array.from({length: 6}, (_,index) => index);
    const workImages = [
        prokopjevaLenaSitePng,
        yachtingSpbsuSitePng
    ];
    const workNames = [
        'prokopjeva-lena.ru',
        'yachting-spbsu.ru'
    ];
    const workDescriptions = [
        'Website of russian artist Lena Prokopjeva',
        'Prototype-site of russian yachting club'
    ];

    const portfolioTitleAnimation = (scrollPos >= 1500 && scrollPos <= 2200);

    const sliderScrollbarRef = useRef<HTMLDivElement|null>(null);
    const [sliderScrollbarWidth, setSliderScrollbarWidth] = useState(0);
    
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

    const [isScreenLeftSide, setIsScreenLeftSide] = useState(false);
    const workElements = document.querySelectorAll('.work');
    useEffect(()=>{
        workElements.forEach((work=>{
            const workDom = work.getBoundingClientRect();
            const screenMiddle = sliderScrollbarWidth/2;

            if(workDom.left < screenMiddle){
                setIsScreenLeftSide(true)
            }
        }))
    },[dragging]);

    return (
        <section className="section portfolio" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className="container portfolio__container">
                <div className={`title portfolio__title ${portfolioTitleAnimation ? 'sectionTitleAnimationIn' : 'sectionTitleAnimationOut'}`}>
                    <h2>works</h2>
                </div>
                <div className="row portfolio__slider slider">
                    {/* <div className="column portfolio__column portfolio__column_1">

                    </div>
                    <div className="column portfolio__column">

                    </div>
                    <div className="column portfolio__column portfolio__column_3">

                    </div> */}
                    <div 
                        ref={portfolioWorksRef}
                        className="row portfolio__works works"
                    >
                        {portfolio__works.map((work,index)=>(
                            <div 
                                key={work}
                                className="column portfolio__column work"
                                style={{
                                    transform: 
                                    `
                                    translateX(
                                        ${(mousePosition<0) ? 
                                        '0px': 
                                        (mousePosition>sliderScrollbarWidth-40) ?
                                            `${-(portfolioWorksWidth-sliderScrollbarWidth)}px` :
                                            `${-mousePosition*((portfolioWorksWidth-sliderScrollbarWidth)/(sliderScrollbarWidth-40))}px`}
                                    ) 
                                    perspective(800px)
                                    rotateY(
                                        ${isScreenLeftSide?
                                            `${mousePosition*0.1}deg`:
                                            `${-mousePosition*0.1}deg`
                                        }
                                    )
                                    `

                                }}
                            >
                                <div className="work__img"></div>
                                <div className="work__name"></div>
                                <div className="work__description">{work}</div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="test">{isScreenLeftSide?'true':'false'}</div> */}
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