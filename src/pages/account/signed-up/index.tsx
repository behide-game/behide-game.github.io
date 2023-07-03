import { onMount } from "solid-js"

const getUrlParamError = () => {
  const searchParams = new URLSearchParams(document.location.search)
  const error = searchParams.get("failed")

  switch (error) {
    case "user-already-exists": return "user-already-exists"
    case "user-with-same-email-exists": return "user-with-same-email-exists"
    case "many-users-already-exist": return "many-users-already-exist"
    case null: return null
    default: return "unknown"
  }
}

export default () => {
  const error = getUrlParamError()

  onMount(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const token = searchParams.get("token")
    const refreshToken = searchParams.get("refreshToken")

    if (!token || !refreshToken) return

    window.localStorage.setItem("token", token)
    window.localStorage.setItem("refreshToken", refreshToken)
  })

  switch (error) {
    case "user-already-exists": return <>User already exists</>
    case "user-with-same-email-exists": return <>User with same email exists</>
    case "many-users-already-exist": return <>Many users already exists. Not good news. Please contact admins on <a href="https://discord.gg/sRJ9uSm7fF">discord</a></>
    case "unknown": return <>Unknown error</>
    default: return (
      <>Signed up</>
    )
  }
}