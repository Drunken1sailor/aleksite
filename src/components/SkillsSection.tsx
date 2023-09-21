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
import mountainImg from "../img/mountains.png";
import programmingImg from "../img/skills/hobbyProgramming.png";
import physicsImg from "../img/skills/hobbyPhysics.png";
import sportImg from "../img/skills/hobbySport.png";
import drawingImg from "../img/skills/hobbyDrawing.png";
import guitarImg from "../img/skills/hobbyGuitar.png";
import singinImg from "../img/skills/hobbySinging.png";

interface SkillsSectionProps{
    scrollPos:number;
}

const SkillsSection:React.FC<SkillsSectionProps> = (props) => {
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
    const animationDelayArray = Array.from({length: 9}, (_, index) => index*0.1);
    const hobbyNames = [
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

    const [skillWidth, setSkillWidth] = useState(0);
    const widthExampleRef = useRef<HTMLDivElement|null>(null);
    useEffect(()=>{
        if(widthExampleRef.current){
            setSkillWidth(widthExampleRef.current.clientWidth);
        }
    },[]);

    return (
        <section className="section skillsSection">
            <div className="mountain skillsSection__topMountain">
                <img src={mountainImg} alt="there should have been mountain here" draggable="false"/>
            </div>
            <div className="skillsSection__bg">
                <img className='skillsSection__bgImageMain' src={skillsBgImg} alt="background" />
                <img className='skillsSection__bgImageLeft' src={skillsBgLeft} alt="background-left" />
                <img className='skillsSection__bgImageRight' src={skillsBgRight} alt="background-left" />
            </div>
            <div className="wrapper skillsSection__wrapper">
                <div className="skillsSection__container container">
                    <div className="skills">
                        <div className="title skills__title">
                            <h2 id="skillsTitle">My skills</h2>
                        </div>
                        <div className="row skills__row">
                            {animationDelayArray.map((delay, index)=>(
                                <div 
                                    key={delay}
                                    ref={index === 0 ? widthExampleRef : null} 
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
                        </div>
                        <div className="hobbies">
                            <div id='hobbiesTitle' className="title hobbies__title">
                                <h2>My hobbies</h2>
                            </div>
                            <div className="hobbies__row row">
                                {hobbyNames.map((hobby, index)=>(
                                    <div 
                                        key={hobby} 
                                        className="hobby"
                                        style={{animationDelay: `${4 + animationDelayArray[index]}s`}}
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
            <div className="mountain mountain__end">
                <img src={mountainImg} alt="there should have been mountain here" draggable="false"/>
            </div>
        </section>
    )
}
export default SkillsSection;