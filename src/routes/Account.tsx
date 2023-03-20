import { AuthSession } from "@supabase/supabase-js"
import { createEffect, createSignal } from "solid-js"
import { supabase } from "../supabase"

const random = (min: number, max: number) => { return Math.random() * (max - min) + min }

const array = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" ]

const generateTag = () => {
  return (
    array[Math.floor(random(0, array.length))] +
    array[Math.floor(random(0, array.length))] +
    array[Math.floor(random(0, array.length))] +
    array[Math.floor(random(0, array.length))]
  )
}

export default ({ session }: { session: AuthSession }) => {
  const [loading, setLoading] = createSignal(true)
  const [username, setUsername] = createSignal<string | null>(null)
  const [tag, setTag] = createSignal<string | null>(null)
  const [createdAt, setCreatedAt] = createSignal<string | null>(null)

  createEffect(() => retrieveUser())

  const retrieveUser = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("users")
      .select("username, tag, created_at")
      .eq("id", session.user.id)
      .single()

    if (error) alert(error.message)
    if (data) {
      setUsername(data.username)
      setTag(data.tag)
      setCreatedAt(data.created_at)
    }

    setLoading(false)
  }

  const updateUser = async (e: Event) => {
    e.preventDefault()
    setLoading(true)

    const updates = {
      id: session.user.id,
      username: username(),
      tag: tag() || generateTag(),
      created_at: createdAt() || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from("users").upsert(updates)

    if (error) alert(error.message)

    setLoading(false)
  }

  return (
    <div aria-live="polite">
      <form onSubmit={updateUser} class="form-widget">
        <div>Email: {session.user.email}</div>
        <div>
          <label for="username">Name</label>
          <input
            id="username"
            type="text"
            value={username() || ""}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          <label for="tag">Tag</label>
          <span>{tag() || <i>No tag</i>}</span>
        </div>
        <div>
          <button type="submit" class="button primary block" disabled={loading()}>
            {loading() ? "Saving ..." : "Update profile"}
          </button>
        </div>
        <button type="button" class="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </form>
    </div>
  )
}