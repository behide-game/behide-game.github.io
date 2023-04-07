import { createSignal, Index, onMount } from "solid-js"
import sass from "./AnimatedText.module.sass"

export interface Props {
  className?: string;
  children: HTMLElement
}

export default (props: Props) => {
  const [initialCharList, setInitialCharList] = createSignal([])
  const [charList, setCharList] = createSignal([])


  // Logic
  onMount(() => {
    const charList =
      props.children.innerText
        .split("")
        .map((char, index) =>
          char === " "
            ? [index, "\u00A0", 1]
            : [index, char, 1]
        )

    setInitialCharList(charList)
    setCharList(charList)
  })

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
    setCharList(initialCharList())
  }


  // UI
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