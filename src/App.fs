module App

open Feliz
open Fable.Core.JsInterop

[<ReactComponent>]
let Banner () =
    Html.div [
        prop.className "banner"
        prop.children [
            Html.img [
                prop.className "banner-image"
                prop.src (importDefault "./assets/banner.png")
                prop.alt "The logo of Behide."
            ]

            Html.span [
                prop.className "banner-text"
                prop.text "The new prop hunt"
            ]
        ]
    ]

[<ReactComponent>]
let Badges () =
    Html.div [
        prop.className "badges"
        prop.children (
            [ {| Image = importDefault "./assets/github.png"
                 Alt = "The logo of GitHub."
                 Text = "open source" |}
              {| Image = importDefault "./assets/mirror.png"
                 Alt = "The logo of the networking library Mirror."
                 Text = "mirror" |}
              {| Image = importDefault "./assets/money.png"
                 Alt = "An icon that represent money."
                 Text = "free to play" |} ]
            |> List.map Components.Badge.Badge
        )
    ]

[<ReactComponent>]
let View () =
    importSideEffects "./App.sass"

    React.fragment [
        Banner()
        Badges()
        Components.Warning.Warning {| Message = "This game is still in development.\nFor the moment there isn’t any beta release." |}
    ]

ReactDOM.render(View(), Browser.Dom.document.getElementById "root")