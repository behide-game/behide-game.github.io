import { createSignal, Index } from "solid-js"
import behideLogo from "../assets/behide.svg"
import sass from "./Home.module.sass"

const Banner = () => (
  <div class={sass.banner}>
    <div class={sass.logo}>
      <img src={behideLogo} alt="The Behide logo" />
      <span class={sass.title}>Behide</span>
    </div>
    <AnimatedText className={sass.subtitle}>The new prop hunt</AnimatedText>
  </div>
)

const AnimatedText = (props: { className?: string;  children: string }) => {
  const initialeCharList = props.children.split("").map((char, index) => char === " " ? [index, "\u00A0", 1] : [index, char, 1])
  const [charList, setCharList] = createSignal(initialeCharList)

  // Logic
  const handleHover = (index: number) => {
    const charIndex = index

    const limit = 4
    const newCharList =
      charList().map((item, index) => {
        if (index >= charIndex - limit && index <= charIndex + limit) {
          const distance = Math.abs(index - charIndex)
          return [item[0], item[1], distance/limit]
        } else {
          return [item[0], item[1], 1]
        }
      })

    setCharList(newCharList)
  }

  const handleLeave = () => {
    setCharList(initialeCharList)
  }

  return (
    <div class={`${sass["animated-text"]} ${props.className || ""}`} onPointerLeave={handleLeave}>
      <Index each={charList()}>{(item, index) =>
        <span
          id={item()[0].toString()}
          class={sass["animated-char"]}
          style={`--variation: ${item()[2]};`}
          onPointerMove={() => handleHover(index)}
        >
          {item()[1]}
        </span>
      }</Index>
    </div>
  )
}

export default () => {
  return (
    <>
      <div class={sass.home}>
        <Banner />

        <div class={sass["ball-container"]}>
          <div id={sass["ball-background"]} />

          <div class={sass.content}>
            <h1>What is that !?</h1>

            <div class={sass.features}>
              <span class={sass.feature} style="--color: #6556D9;">Open<br/>source</span>
              <span class={sass.feature} style="--color: #2B68E3;">Free to play</span>
              <span class={sass.feature} style="--color: #8A93A6;">Unity<br/>engine</span>
              <span class={`${sass.feature} ${sass.mobile}`} style="--color: #6556D9;">Open source</span>
              <span class={`${sass.feature} ${sass.mobile}`} style="--color: #2B68E3;">Free to play</span>
              <span class={`${sass.feature} ${sass.mobile}`} style="--color: #8A93A6;">Unity engine</span>
            </div>

            <a href="https://github.com/behide-game/">See on GitHub</a>
          </div>
        </div>

      </div>
    </>
  )
}