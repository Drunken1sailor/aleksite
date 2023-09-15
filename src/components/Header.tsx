import avaImg from "../img/ava.jpg";

interface HeaderProps{
    scrollPos:number;
}

const Header : React.FC<HeaderProps> = (props) =>{
    const scrollPos = props.scrollPos;
    

    return(
        <div className="header" id="header">
            {/* <div className="header__shine">shine</div> */}
            <div className="header__container">
                <div className={`header__avatar avatar avatar_animation_in `}>
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
                    transform: translateY(${scrollPos*0.2}px) scale(${1-scrollPos*0.0008});
                    opacity: ${1-scrollPos*0.0005};
                }
                `}
                </style>
            </div>
            <div className="header__bg">
                {/* <div className="shadow"></div>
                <video className="header__video" ref={videoRef} autoPlay loop muted disablePictureInPicture>
                    <source src={videoWEBM} type="video/webm"/>
                    <source src={videoMP4} type="video/mp4"/>
                    Your browser does not support the video playback.
                </video> */}
            </div>
        </div>
    )
};
export default Header;