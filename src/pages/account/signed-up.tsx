import { JSXElement, createSignal, onMount } from "solid-js"

export default () => {
  const [error, setError] = createSignal<string | JSXElement | null>()

  onMount(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const paramError = searchParams.get("error")
    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    switch (paramError) {
      case "user-already-exists": setError("User already exists"); break
      case "user-with-same-email-exists": setError("User with same email exists"); break
      case "many-users-already-exist": setError(<>Many users already exists with this email. Not good news. Please contact admins on <a href="https://discord.gg/sRJ9uSm7fF">discord</a>.</>); break
      case null: setError(null); break
      default: setError("Unknown error: " + paramError); break
    }

    if (accessToken && refreshToken && !paramError) {
      window.localStorage.setItem("accessToken", accessToken)
      window.localStorage.setItem("refreshToken", refreshToken)
      document.location.href = "/account?signed-up=true"
    } else if (!paramError) {
      document.location.href = "/"
    }
  })

  return (
    <p>
      {error()
        ? error()
        : "Signed up, redirecting..."}
    </p>
  )
}