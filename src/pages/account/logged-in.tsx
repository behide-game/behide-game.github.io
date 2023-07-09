import { JSXElement, createSignal, onMount } from "solid-js"

export default (props: { children?: JSXElement }) => {
  const [error, setError] = createSignal<string | JSXElement | null>()

  onMount(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const paramError = searchParams.get("error")
    const accessToken = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    switch (paramError) {
      case "404": setError(<>User not found, are you signed up ?{props.children}</>); break
      case "400": setError("Failed to sign up."); break
      case "500": setError("Failed to create a token."); break
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
        : "Logged in, redirecting..."}
    </p>
  )
}