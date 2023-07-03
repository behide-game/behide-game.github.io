import { onMount } from "solid-js"

const getUrlParamError = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const error = searchParams.get("failed")

  switch (error) {
    case "user-not-found": return "user-not-found"
    case null: return null
    default: return "unknown"
  }
}

export default () => {
  const error = getUrlParamError()

  onMount(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const token = searchParams.get("access_token")
    const refreshToken = searchParams.get("refresh_token")

    if (!token || !refreshToken) return

    window.localStorage.setItem("token", token)
    window.localStorage.setItem("refreshToken", refreshToken)
  })

  switch (error) {
    case "user-not-found": return <>User not found</>
    case "unknown": return <>Unknown error</>
    default: return (
      <>Logged in</>
    )
  }
}