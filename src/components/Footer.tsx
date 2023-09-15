import githubImg from "../img/footer/github.png";
import instagramImg from "../img/footer/instagram.png";
import telegramImg from "../img/footer/telegram.png";
import whatsappImg from "../img/footer/whatsapp.png";
import viberImg from "../img/footer/viber.png";
import mountainImg from "../img/footer/footerMountain.png";

const Footer = () => {
    const copyToClipboard = () => {
        const textToCopy = document.getElementById('contacts__phone')?.innerText;
        const phoneCopiedAlert = document.getElementById('phoneCopiedAlert');
        if (textToCopy) {
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
    
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
    
          phoneCopiedAlert?.classList.add('alertAnimation');
          setTimeout(() => {
            phoneCopiedAlert?.classList.remove('alertAnimation');
          }, 3000);
        }
    };
    return (
        <section className="section footer">
            <div className="mountain footer__mountain">
                <img src={mountainImg} alt="there should have been mountain here" draggable="false"/>
            </div>
            <div className="container footer__container">
                <div className="row footer__row">
                   <div className="row contacts__row">
                        <div className="column row">
                            <a href="https://github.com/Drunken1sailor" target="_blank" className="column contacts__column contacts__git">
                                <img className="contacts__img" src={githubImg} alt="github" />
                            </a>
                            <a href="https://instagram.com/alek_seevil?igshid=NzZlODBkYWE4Ng==" target="_blank" className="column contacts__column contacts__insta">
                                <img className="contacts__img" src={instagramImg} alt="instagram" />
                            </a>
                            <a href="https://t.me/ilyushkaaaaaaaa" target="_blank" className="column contacts__column contacts__telegram">
                                <img className="contacts__img" src={telegramImg} alt="telegram" />
                            </a> 
                        </div>
                        <div className="column row phoneNumber" onClick={copyToClipboard}>
                            <div className="column contacts__whatsapp">
                                <img className="contacts__img" src={whatsappImg} alt="whatsapp" />
                            </div>
                            <p id="contacts__phone">+381621774410</p>
                            <div className="column contacts__viber">
                                <img className="contacts__img" src={viberImg} alt="viber" />
                            </div>
                        </div>
                        <div className="column phoneCopiedAlert" id="phoneCopiedAlert"><p>Phone number <br /> copied to clipboard</p></div>
                    </div>
                    <div className="location">
                        <p>Location</p>
                        <p>Serbia, Belgrade</p>
                    </div>
                </div> 
            </div>
        </section>
    )
}
export default Footer;