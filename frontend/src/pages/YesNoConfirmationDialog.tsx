
type Props = {
    setConfirmationPrompt: (confirmationPrompt: boolean) => void
    actionHandle : () => void
}

export function YesNoConfirmationDialog(props: Readonly<Props>){
    return(
        <>
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to perform delete action?</p>
                        <button style={{margin:"6px"}} onClick= {props.actionHandle}>Yes</button>
                        <button style={{margin:"6px"}} onClick={() => props.setConfirmationPrompt(false)}>No</button>
                    </div>
                </div>
        </>
    )

}
