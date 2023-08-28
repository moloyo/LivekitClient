type InputProps = {
    value: string,
    label?: string,
    placeholder?: string,
    onChange: (param: any) => void
}

export default function InputText(props: InputProps) {
    return (
        <>
            <div className="mb-4">
                {props.label &&
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="control">
                    {props.label}
                </label>}
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={props.value} id="control" type="text" onChange={props.onChange} placeholder={props.placeholder} />
            </div>
        </>
    );
}