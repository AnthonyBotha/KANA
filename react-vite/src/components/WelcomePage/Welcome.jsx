import SignupFormPage from "../SignupFormPage"

function WelcomePage() {
  return (
    <div className="fullScreen purple displayFlex">

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
  )
}

export default WelcomePage;