module Components.Badge

open Feliz
open Fable.Core.JsInterop

importSideEffects "./Badge.sass"

[<ReactComponent>]
let Badge (props: {| Image: string; Alt: string; Text: string |}) =
    Html.div [
        prop.className "badge"
        prop.children [
            Html.img [
                prop.className "badge-image"
                prop.src props.Image
                prop.alt props.Alt
            ]

            Html.span [ prop.className "badge-line" ]

            Html.span [
                prop.className "badge-text"
                prop.text props.Text
            ]
        ]
    ]