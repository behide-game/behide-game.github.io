import { createSignal, JSXElement, onMount } from "solid-js"
import sass from "./Card.module.sass"

type Props = {
  children?: JSXElement[] | JSXElement,
  className?: string,
  style?: string,
  shineColor?: string
}

type ButtonProps = {
  children?: JSXElement,
  className?: string,
  style?: string,
  shineColor?: string
}

export const Card = (props: Props) => {
  // Refs
  let card: HTMLElement | undefined = undefined
  let shine: HTMLElement | undefined = undefined

  // Variables
  let [cardX, setCardX] = createSignal(0)
  let [cardY, setCardY] = createSignal(0)
  let [cardWidth, setCardWidth] = createSignal(0)
  let [cardHeight, setCardHeight] = createSignal(0)
  let [shineWidth, setShineWidth] = createSignal(0)

  // Logic
  let handleMove = (evt: PointerEvent) => {
    if (!card) return
    if (!shine) return

    let x = evt.pageX - cardX()
    let y = evt.pageY - cardY()
    shine.style.transform = `translate(${x - shineWidth()/2}px, ${y - shineWidth()/2}px)`

    let centeredX = (x - cardWidth() / 2) / cardWidth() * -2
    let centeredY = (y - cardHeight() / 2) / cardHeight() * 2
    card.style.transform = `perspective(600px) rotateX(${centeredY}deg) rotateY(${centeredX}deg)`
  }

  let handleLeave = () => {
    if (!card) return
    card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg)`
  }

  onMount(() => {
    let cardRect = card!.getBoundingClientRect()
    setCardX(cardRect.x)
    setCardY(cardRect.y)
    setCardWidth(cardRect.width)
    setCardHeight(cardRect.height)

    setShineWidth(shine!.offsetWidth)
  })

  return (
    <div
      style={`${props.shineColor ? "--shine-color: " + props.shineColor : ""}; ${props.style || ""}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      class={`${sass.card} ${props.className || ""}`}
      ref={card}>
      <span class={sass.shine} ref={shine} />
      {props.children}
    </div>
  )
}

export const ButtonCard = (props: ButtonProps) => {
  // Refs
  let card: HTMLElement | undefined = undefined

  // Variables
  let [cardX, setCardX] = createSignal(0)
  let [cardY, setCardY] = createSignal(0)
  let [cardWidth, setCardWidth] = createSignal(0)
  let [cardHeight, setCardHeight] = createSignal(0)

  // Logic
  let handleMove = (evt: PointerEvent) => {
    if (!card) return

    let x = evt.pageX - cardX()
    let y = evt.pageY - cardY()
    card.style.background = `radial-gradient(120% calc(120% * 21/13) at ${x / cardWidth() * 100}% ${y / cardHeight() * 100}%, var(--shine-color, #5ebfff) 0%, #00000000 85%), #000000`
  }

  onMount(() => {
    let cardRect = card!.getBoundingClientRect()
    setCardX(cardRect.x)
    setCardY(cardRect.y)
    setCardWidth(cardRect.width)
    setCardHeight(cardRect.height)
  })

  return (
    <div
      style={`${props.shineColor ? "--shine-color: " + props.shineColor : ""}; ${props.style || ""}`}
      onPointerMove={handleMove}
      class={`${sass.button} ${props.className || ""}`}
      ref={card}>
      <span class={sass.text}>{props.children}</span>
    </div>
  )
}