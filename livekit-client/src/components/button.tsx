type ButtonProps = {
    text: string,
    disabled: boolean,
    onClick: (param: any) => void
}

export default function Button(props: ButtonProps) {
    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 rounded py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={props.disabled}
                onClick={props.onClick}>
                {props.text}
            </button>
        </>
    );
}