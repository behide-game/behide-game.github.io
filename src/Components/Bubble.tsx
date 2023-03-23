import { JSX } from "solid-js"
import sass from "./Bubble.module.sass"

type BubbleContainerProps = {
  className?: string,
  children?: JSX.Element | JSX.Element[],
  background?: string,
  threshold?: number,
}

export const BubbleContainer = (props: BubbleContainerProps) => {
  return (
    <div
      class={props.className}
      style={
        (props.background ? `background: ${props.background}; --background: ${props.background}` : "") +
        (props.threshold ? `--threshold: ${props.threshold}%` : "")
      }
    >
      <div class={sass["bubble-container"]}>
        {props.children}
        <div class={sass["color-dodge"]} />
        <div class={sass["color-burn"]} />
      </div>
    </div>
  )
}

export const Bubble = (props: { className?: string }) => (
  <div class={sass.bubble + " " + (props.className === undefined ? "" : props.className)} />
)