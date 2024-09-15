import SmallWhiteLogo from '../../static/SmallLogoWhite.png';

function UserHomePage() {
  return (
    <>
      <h1>Welcome Home, User!</h1>

      {/* footer */}
      <div className="purple displayFlex alignBottom spaceBetween littleBottomPadding">
        <p className='leftPageBorder font whiteFont smallFont noMargin'>© 2024 KANA. All rights reserved.</p>
        <img className="smallLogo" src={SmallWhiteLogo} />
        <a className="rightPageBorder fontLight whiteFont smallFont" href='https://github.com/AnthonyBotha/KANA/wiki'>GitHub</a>
      </div>
    </>
  )
}

export default UserHomePage;