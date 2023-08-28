export default function Form({ children }: React.PropsWithChildren) {
    return (
        <>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </form>
        </>
    );
}