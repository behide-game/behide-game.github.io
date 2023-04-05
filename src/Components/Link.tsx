import sass from "./Link.module.sass"

export const Link = (props: { href: string; children?: string }) => {
  return (
    <a href={props.href} class={sass.link}>
      {props.children}

      <svg class={sass.arrow} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class={sass.chevron} d="M9.39287 4.46186L14.431 9.5L9.39287 14.5381" stroke="black" stroke-width="1.78127" stroke-linecap="round" stroke-linejoin="round"/>
        <path class={sass.line} d="M14.4311 9.5H3.51514" stroke="black" stroke-width="1.78125" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  )
}