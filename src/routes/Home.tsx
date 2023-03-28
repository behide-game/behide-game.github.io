import behideLogo from "../assets/behide.svg"
import { ButtonCard } from "../Components/Card"
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

export default () => {
  return (
    <div class={sass.home}>
      <Banner />

      <div id={sass.ball}>
      <div class={sass.content}>
        <h1>What is that !?</h1>

        <div class={sass.features}>
          <ButtonCard shineColor="#00ff165f">Open source</ButtonCard>
          <ButtonCard shineColor="#009aff5f">Free{"\n"}to play</ButtonCard>
          <ButtonCard shineColor="#ff002e5f">Made with{"\n"}Unity</ButtonCard>
        </div>

        <a href="https://github.com/behide-game/">See on GitHub</a>
      </div>
      </div>
    </div>
  )
}