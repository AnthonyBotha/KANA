import SignupFormPage from "../SignupFormPage"
import SmallWhiteLogo from '../../static/SmallLogoWhite.png';

function WelcomePage() {
  return (
    <>
      <div className="blackBackground fullScreen purple displayFlex">

        {/* left side of the page */}
        <div className="halfScreen leftPageBorder fullPadding">
          <p className="font xx-largeFont whiteFont bold">Motivate yourself to achieve your goals.</p>
          <p className="font smallFont whiteFont">It&apos;s time to have fun when you get things done!
            KANA users improve their life one task at a time.
          </p>
        </div>


        {/* right side of the page */}
        <div className="halfScreen rightPageBorder fullPadding">
          <SignupFormPage />
        </div>

      </div>
      
      {/* footer */}
      <div className="purple displayFlex alignBottom spaceBetween littleBottomPadding">
      <p className='leftPageBorder font whiteFont smallFont noMargin'>© 2024 KANA. All rights reserved.</p>
      <img className="smallLogo" src={SmallWhiteLogo} />
      <a className="rightPageBorder fontLight whiteFont smallFont" href='https://github.com/AnthonyBotha/KANA/wiki'>GitHub</a>
      </div>
  </>
  )
}

export default WelcomePage;