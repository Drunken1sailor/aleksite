import {useRef, useState, useEffect} from 'react';
import reactjsImg from "../img/skills/reactjs.png";
import nodejsImg from "../img/skills/nodeJS.png";
import phpImg from "../img/skills/PHP.png";
import pythonImg from "../img/skills/python.png";
import javaImg from "../img/skills/java.png";
import typeScriptImg from "../img/skills/typescript.png";
import htmlImg from "../img/skills/html.png";
import cssImg from "../img/skills/css-logo.png";
import jsImg from "../img/skills/JavaScript-logo.png";
import skillsBgImg from "../img/skills/skillsBg.png";
import skillsBgLeft from "../img/skills/skillsBg-left.png";
import skillsBgRight from "../img/skills/skillsBg-right.png";
import programmingImg from "../img/skills/hobbyProgramming.png";
import physicsImg from "../img/skills/hobbyPhysics.png";
import sportImg from "../img/skills/hobbySport.png";
import drawingImg from "../img/skills/hobbyDrawing.png";
import guitarImg from "../img/skills/hobbyGuitar.png";
import singinImg from "../img/skills/hobbySinging.png";
import skillsBgRightTentacles from "../img/skills/skillsBg-right-tentacles.png";
import skillsBgLeftTentacles from "../img/skills/skillsBg-left-tentacles.png";

interface SkillsSectionProps{
    scrollPos:number;
}

const SkillsSection:React.FC<SkillsSectionProps> = (props) => {
    //animation of skill images and hobbie elements
    const scrollPos = props.scrollPos;
    const skillAnimationIn = scrollPos >= 400;
    const skillsTitle = document.getElementById('skillsTitle');
    const hobbiesTitle = document.getElementById('hobbiesTitle');
    const skillElements = document.querySelectorAll('.skill');
    const hobbyElements = document.querySelectorAll('.hobby');
    const skillsSectionParagraphElements = document.querySelectorAll('.skillsSection__text_p');
    if (skillAnimationIn) {
        skillElements.forEach(element => {
            element.classList.add('skillAnimationIn');
        });
        hobbyElements.forEach(element => {
            element.classList.add('hobbyAnimationIn');
        });
        skillsSectionParagraphElements.forEach(element => {
            element.classList.add('skillsSection__textAnimationIn');
        });
        skillsTitle?.classList.add('skillsTitleAnimationIn');
        hobbiesTitle?.classList.add('hobbiesTitleAnimationIn');
    }

    //arrays for initializating of skills and hobbies
    const skillsImagesArray = [
        reactjsImg,
        nodejsImg,
        phpImg,
        pythonImg,
        javaImg,
        typeScriptImg,
        htmlImg,
        cssImg,
        jsImg
    ];
    const animationDelayArray = Array.from({length: skillsImagesArray.length}, (_, index) => index*0.1);
    const hobbyNamesArray = [
        'programming',
        'physics',
        'sport',
        'drawing',
        'guitar',
        'singing'
    ]
    const hobbiesImagesArray = [
        programmingImg,
        physicsImg,
        sportImg,
        drawingImg,
        guitarImg,
        singinImg
    ];


    //adaptive
    const skillWidthExampleRef = useRef<HTMLDivElement|null>(null);
    const [skillWidth, setSkillWidth] = useState(0);
    const skillsSectionRef = useRef<HTMLDivElement|null>(null);
    const [skillsSectionWidth, setSkillsSectionWidth] = useState(0);
    // const skillsSection_element = document.querySelector('.skillsSection') as HTMLElement | null;
    // const skillsSection__text_p_elements = document.querySelectorAll('.skillsSection__text_p') as NodeListOf<HTMLElement>;
    const hobbyWidthExampleRef = useRef<HTMLDivElement|null>(null);
    const [hobbyWidth, setHobbyWidth] = useState(0);
    useEffect(()=>{
        if(skillWidthExampleRef.current){
            setSkillWidth(skillWidthExampleRef.current.clientWidth);
        }
        if(skillsSectionRef.current){
            // setSkillsSectionWidth(skillsSection_element.offsetWidth);
            // skillsSection__text_p_elements.forEach(element=>{
            //     element.style.fontSize = `${skillsSectionWidth*0.015}px`;
            // });
            setSkillsSectionWidth(skillsSectionRef.current.offsetWidth);
        }
        if(hobbyWidthExampleRef.current){
            setHobbyWidth(hobbyWidthExampleRef.current.clientWidth);
        }
    },[window.innerWidth]);

    return (
        <section className="section skillsSection">
            <div className="mountain skillsSection__topMountain">
                {/* <img src={mountainImg} alt="there should have been mountain here" draggable="false"/> */}
            </div>
            <div className="skillsSection__bg">
                <img className='skillsSection__bgImage main-img' src={skillsBgImg} alt="background" draggable="false"/>
                <img className='skillsSection__bgImage img-left' src={skillsBgLeft} alt="background-left" draggable="false"/>
                <img className='skillsSection__bgImage img-right' src={skillsBgRight} alt="background-left" draggable="false"/>
                <img className='skillsSection__bgImage tentacle img-right-tentacles' src={skillsBgRightTentacles} alt="background-left" draggable="false"/>
                <img className='skillsSection__bgImage tentacle img-left-tentacles' src={skillsBgLeftTentacles} alt="background-right" draggable="false"/>
            </div>
            <div ref={skillsSectionRef} className="wrapper skillsSection__wrapper">
                <div className="skillsSection__container container">
                    <div className="skills skillsSection__leftSide">
                        <div className="title skills__title">
                            <h2 id="skillsTitle">My skills</h2>
                        </div>
                        <div className="row skills__row">
                            {animationDelayArray.map((delay, index)=>(
                                <div 
                                    key={delay}
                                    ref={index === 0 ? skillWidthExampleRef : null} 
                                    className="column skills__column skill"
                                    style={{animationDelay: `${delay}s`}}
                                >
                                    <div className="skill_image"><img draggable="false" src={skillsImagesArray[index]} alt="Skill" /></div>
                                </div>
                            ))}
                        
                            <style>
                                {`
                                    .skills__column{
                                        height: ${skillWidth}px;
                                    }
                                    
                                `}
                            </style>
                        </div>
                    </div>
                    <div className="skillsSection__rightSide">
                        <div className="skillsSection__text">
                            <p className="skillsSection__text_p skillsSection__text_p-1">the combination of my passion for digital drawing </p>
                            <p className="skillsSection__text_p skillsSection__text_p-2">with web development sometimes gives rise to </p>
                            <p className="skillsSection__text_p skillsSection__text_p-3">something very creative and sometimes even </p> 
                            <p className="skillsSection__text_p skillsSection__text_p-4">beautiful</p>
                            <style>
                                {`
                                .skillsSection__text_p{
                                    font-size:${skillsSectionWidth*0.015}px;
                                }
                                `}
                            </style>
                        </div>
                        <div className="hobbies">
                            <div id='hobbiesTitle' className="title hobbies__title">
                                <h2>My hobbies</h2>
                            </div>
                            <div className="hobbies__row row">
                                {hobbyNamesArray.map((hobby, index)=>(
                                    <div 
                                        key={hobby} 
                                        ref={index === 0 ? hobbyWidthExampleRef : null}
                                        className="hobby"
                                        style={{animationDelay: `${4 + animationDelayArray[index]}s`,
                                                width: `${hobbyWidth}px`,
                                                height: `${hobbyWidth}px`
                                        }}
                                    >
                                        <div className="hobby__img"><img draggable="false" src={hobbiesImagesArray[index]} alt="" /></div>
                                        <div className="hobby__description">{hobby}</div>
                                    
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="mountain skillsSection__bottomMountain">
            </div>
            <style>
                {`
                    @media(max-width:750px){
                        .skillsSection__container{
                          padding-top: ${skillWidth*2}px;
                        }
                        .skillsSection__leftSide{
                          margin-bottom: ${skillWidth*1.6}px;
                        }
                    }
                `}
            </style>
        </section>
    )
}
export default SkillsSection;