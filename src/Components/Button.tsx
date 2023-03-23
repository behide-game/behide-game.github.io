import sass from "./Button.module.sass"

export const Primary = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button class={sass.primary} onClick={onClick}>{text}</button>
)