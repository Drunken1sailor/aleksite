import avaImg from "../img/header/ava.jpg";
import haederBgImg from "../img/header/headerBg.png";
import firstPlanetImg from "../img/header/firstPlanet.png";
import secondPlanetImg from "../img/header/secondPlanet.png";
import thirdPlanetImg from "../img/header/thirdPlanet.png";
import forthPlanetImg from "../img/header/forthPlanet.png";
import spaceDustImg from "../img/header/smoke.png";
import sunShineImg from "../img/header/sunShine.png";
import frontSpaceDustImg from "../img/header/frontSmoke.png";
import satelliteImg from "../img/header/satellite.png";

interface HeaderProps{
    scrollPos:number;
}

const Header : React.FC<HeaderProps> = (props) =>{
    const scrollPos = props.scrollPos;
    

    return(
        <div className="header section" id="header">
            {/* <div className="header__shine">shine</div> */}
            <div className="header__bg">
                <img className="header__bgImage main-img" src={haederBgImg}  draggable="false"/>
                <img className="header__bgImage planet_1 planet" src={firstPlanetImg} draggable="false"/>
                <img className="header__bgImage planet_2 planet" src={secondPlanetImg} draggable="false"/>
                <img className="header__bgImage planet_3 planet" src={thirdPlanetImg} draggable="false"/>
                <img className="header__bgImage planet_4 planet" src={forthPlanetImg} draggable="false"/>
                <img className="header__bgImage dust" src={spaceDustImg} draggable="false"/>
                <img className="header__bgImage sunshine" src={sunShineImg} draggable="false"/>
                <img className="header__bgImage frontSpaceDust" src={frontSpaceDustImg} draggable="false"/>
                <img className="header__bgImage satellite" src={satelliteImg} draggable="false"/>
                <style>
                {`
                .header__bg{
                }
                .planet_1{
                    transform: translate(${scrollPos*0.4}px, 0) scale(${1+scrollPos*0.00008});
                }
                .planet_2{
                    transform: translate(calc(-30% + ${scrollPos*-0.1}px), calc(30% + ${scrollPos*0.005}px));
                }
                .dust{
                    transform: scale(${1+scrollPos*0.00008});
                    opacity: ${1-scrollPos*0.0004};
                }
                .planet_3{
                    transform: translate(calc(-25% + ${scrollPos*0.05}px), ${scrollPos*-0.08}px);
                }
                .planet_4{
                    transform: translate(calc(-20% - ${scrollPos*0.08}px), ${scrollPos*-0.12}px);
                }
                .dust{
                    transform: scale(${1+scrollPos*0.00005});
                }
                .frontSpaceDust{
                    transform: scale(${0.9+scrollPos*0.0005});
                    opacity: ${0.9+scrollPos*0.0008};
                }
                .satellite{
                    transform: translate(${scrollPos*0.05}px, -${scrollPos*0.3}px);
                }
                `}
                </style>
            </div>
            <div className="header__container">
                <div className='header__avatar avatar avatar_animation_in'>
                    <div className="avatar__shadow"></div>
                    <img draggable="false" src={avaImg} alt="there should have been an Avatar here" />
                </div>
                <div className="header__text">
                    <div className={`title header__title `}>
                        <h1>
                            Web developer <br /> ILIA ALEKSEEV
                        </h1>
                    </div>
                    <p className={`header__text_p_animation_in`}>
                        I'm that asian guy who likes to work hard
                    </p>
                </div>
                <style>
                {`
                .header__container{
                    transform: translateY(${scrollPos*0.8}px) scale(${1-scrollPos*0.0008});
                    opacity: ${1-scrollPos*0.0005};
                }
                `}
                </style>
            </div>
        </div>
    )
};
export default Header;