type DropdownProps = {
    selectedOption: string,
    label?: string,
    disabled?: boolean,
    options: string[],
    onChange: (param: any) => void
}

export default function DropdownProps(props: DropdownProps) {
    return (
        <>
            <div className="mb-4">
                {props.label &&
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="control">
                        {props.label}
                    </label>}
                <select value={props.selectedOption} onChange={props.onChange} disabled={props.disabled} className="shadow block appearance-none w-full disabled:bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white focus:border-gray-500" id="grid-state">
                    {props.options.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </>
    );
}