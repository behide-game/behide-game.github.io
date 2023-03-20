import { createSignal } from "solid-js";
import { supabase } from "../supabase";

export default () => {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal("")

  const signInWithEmail = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email: email() })

    if (error) alert(error)
    setLoading(false)
  }

  const signInWithDiscord = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: "http://localhost:3000/account" }
    })

    if (error) alert(error)
    setLoading(false)
  }

  return (
    <>
      <input
        type="email"
        placeholder="Your email"
        value={email()}
        onChange={(e) => setEmail(e.currentTarget.value)} />
      <button onClick={signInWithEmail}>{loading() ? <span>Loading</span> : <span>Send magic link</span>}</button>

      <br />

      <button onClick={signInWithDiscord}>Use Discord</button>
    </>
  )
}