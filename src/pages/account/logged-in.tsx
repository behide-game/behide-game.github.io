import { createSignal, onMount } from "solid-js"

const getUrlParamError = () => {
  const searchParams = new URLSearchParams(document.location.search)
  return searchParams.get("error")
}

export default () => {
  const [error, setError] = createSignal<string | null>()

  onMount(() => {
    const error = getUrlParamError()

    switch (error) {
      case null: setError(null); break
      case "404": setError("User not found, are you signed up ?"); return
      case "400": setError("Failed to sign up."); return
      case "500": setError("Failed to create a token."); return
      default: setError("Unknown error: " + error); return
    }

    const searchParams = new URLSearchParams(document.location.search)
    const token = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    if (!token || !refreshToken) return

    window.localStorage.setItem("token", token)
    window.localStorage.setItem("refreshToken", refreshToken)
    document.location.href = "/account"
  })

  return <p style="color: white; font-family: 'Mona Sans'; margin: 0px">{error() ?? "Logged in"}</p>
}