import { AuthSession } from "@supabase/supabase-js"
import { createEffect, createSignal, lazy, Show } from "solid-js"
import { supabase } from "./supabase"
import { A, Navigate, Route, Routes } from "@solidjs/router"

const Home = lazy(() => import("./routes/Home"))
const Login = lazy(() => import("./routes/Login"))
const Account = lazy(() => import("./routes/Account"))

export default () => {
  const [loading, setLoading] = createSignal(true)
  const [session, setSession] = createSignal<AuthSession | null>(null)

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" element={<Show when={!session() && !loading()} fallback={<Navigate href="/account" />}><Login /></Show>} />
        <Route path="/account" element={<Show when={session()} fallback={<Navigate href="/login" />}><Account session={session()!} /></Show>} />
        <Route path="/*" element={<Navigate href="/" />} />
      </Routes>
    </>
  )
}