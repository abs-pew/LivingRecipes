
type Props = {
    setConfirmationPrompt: (confirmationPrompt: boolean) => void
    actionHandle : () => void
    messagePrompt : string
}

export function YesNoConfirmationDialog(props: Readonly<Props>){
    return(
        <>
                <div className="modal">
                    <div className="modal-content">
                        <p>{props.messagePrompt}</p>
                        <button style={{margin:"6px"}} onClick= {props.actionHandle}>Yes</button>
                        <button style={{margin:"6px"}} onClick={() => props.setConfirmationPrompt(false)}>No</button>
                    </div>
                </div>
        </>
    )

}
