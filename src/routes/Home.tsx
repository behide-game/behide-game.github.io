import behideLogo from "../assets/behide.svg"
import githubLogo from "../assets/github.svg"
import arrowDown from "../assets/arrow-down.svg"
import * as Button from "../Components/Button"
import sass from "./Home.module.sass"

const Banner = () => (
  <div class={sass.banner}>
    <div class={sass.logo}>
      <img src={behideLogo} alt="The Behide logo" />
      <span class={sass.title}>Behide</span>
    </div>
    <span class={sass.subtitle}>The new prop hunt</span>
  </div>
)

const Button_ = ({ icon, iconAlt, cssClass, text, onClick }: { icon: string, iconAlt: string, cssClass: string, text: string, onClick: () => void }) => (
  <button class={cssClass} onClick={onClick}>
    <img src={icon} alt={iconAlt} />
    <span class={sass.separator} />
    <span class={sass.text}>{text}</span>
  </button>
)

export default () => {
  const navigateToRepo = () => document.location.assign("https://github.com/behide-game/")

  return (
    <div class={sass.home}>
      <div class={sass["left-part"]}>
        <Banner />
      </div>
      <div class={sass["right-part"]}>
        <div class={sass.features}>
          <div class={sass.feature}><span>What is that ?</span></div>
          <span class={sass.feature}>Free to play</span>
          <span class={sass["complex-feature"]}>
            <span class={sass.title}>Open source</span>
            <span class={sass.action} style={`--background-url: url(${githubLogo})`} onClick={navigateToRepo} />
          </span>
          <span class={sass.feature}>Every man for himself</span>
        </div>

        <div class={sass.arrow} style={`--arrow-down-path: url("${arrowDown}")`} />

        <Button.Primary text="Play" onClick={navigateToRepo} />
      </div>
    </div>
  )
}