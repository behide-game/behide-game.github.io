import behideLogo from "../assets/behide.svg"
import githubLogo from "../assets/github.svg"
import arrowDown from "../assets/arrow-down.svg"
import * as Button from "../Components/Button"
import "./Home.sass"

const Banner = () => (
  <div class="banner">
    <div class="logo">
      <img src={behideLogo} alt="The Behide logo" />
      <span class="title">Behide</span>
    </div>
    <span class="subtitle">The new prop hunt</span>
  </div>
)

const Button_ = ({ icon, iconAlt, cssClass, text, onClick }: { icon: string, iconAlt: string, cssClass: string, text: string, onClick: () => void }) => (
  <button class={cssClass} onClick={onClick}>
    <img src={icon} alt={iconAlt} />
    <span class="separator" />
    <span class="text">{text}</span>
  </button>
)

export default () => {
  const navigateToRepo = () => document.location.assign("https://github.com/behide-game/")

  return (
    <div class="home">
      <div class="left-part">
        <Banner />
      </div>
      <div class="right-part">
        <div class="features">
          <div class="feature"><span>What is that ?</span></div>
          <span class="feature">Free to play</span>
          <span class="complex-feature">
            <span class="title">Open source</span>
            <span class="action" style={`--background-url: url(${githubLogo})`} onClick={navigateToRepo} />
          </span>
          <span class="feature">Every man for himself</span>
        </div>

        <div class="arrow" style={`--arrow-down-path: url("${arrowDown}")`} />

        <Button.Primary text="Play" onClick={navigateToRepo} />
        {/* <Button icon={githubLogo} iconAlt="The GitHub logo" cssClass="github" text="open source" onClick={() => {}} /> */}
      </div>
    </div>
  )
}