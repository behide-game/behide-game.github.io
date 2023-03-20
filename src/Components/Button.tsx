import "./Button.sass"

export const Primary = ({ text, onClick }: { text: string, onClick: () => void }) => (
  <button class="primary" onClick={onClick}>{text}</button>
)