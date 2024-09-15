import SmallLogoWhite from '../../static/SmallLogoWhite.png'

function Footer() {
  return(
    <div className="purple displayFlex alignBottom spaceBetween littleBottomPadding">
      <p className='leftPageBorder font whiteFont smallFont noMargin'>© 2024 KANA. All rights reserved.</p>
      <img className="smallLogo" src={SmallLogoWhite} />
      <a className="rightPageBorder fontLight whiteFont smallFont" href='https://github.com/AnthonyBotha/KANA/wiki'>GitHub</a>
    </div>
  )
}

export default Footer;