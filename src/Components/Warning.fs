module Components.Warning

open Feliz
open Fable.Core.JsInterop

importSideEffects "./Warning.sass"

[<ReactComponent>]
let Warning (props: {| Message: string |}) =
    Html.div [
        prop.className "warning"
        prop.children [
            Html.div [ prop.className "warning-icon" ]

            Html.span [ prop.className "warning-separator" ]

            Html.span [
                prop.className "warning-text"
                prop.text props.Message
            ]
        ]
    ]