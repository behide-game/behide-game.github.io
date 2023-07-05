import { JSXElement, createSignal, onMount } from "solid-js"

export default () => {
  const [displayError, setDisplayError] = createSignal<string | JSXElement | null>()

  onMount(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const error = searchParams.get("error")
    const token = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    switch (error) {
      case "user-already-exists": setDisplayError("User already exists"); break
      case "user-with-same-email-exists": setDisplayError("User with same email exists"); break
      case "many-users-already-exist": setDisplayError(<>Many users already exists with this email. Not good news. Please contact admins on <a href="https://discord.gg/sRJ9uSm7fF">discord</a>.</>); break
      case null: setDisplayError(null); break
      default: setDisplayError("Unknown error: " + error); break
    }

    if (token && refreshToken && !displayError()) {
      window.localStorage.setItem("token", token)
      window.localStorage.setItem("refreshToken", refreshToken)
      document.location.href = "/account?signed-up=true"
      return
    } else if (!displayError()) {
      document.location.href = "/"
    }
  })

  return (
    <p style="color: white; font-family: 'Mona Sans'; margin: 0px; max-width: 400px">
      {displayError()
        ? displayError()
        : "Signed up, redirecting..."}
    </p>
  )
}