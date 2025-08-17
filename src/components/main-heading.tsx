interface HeadingProps {
    h1: string;
    text: string;
}

function Heading({ h1, text }: HeadingProps) {
    return (
        <div className="flex flex-col gap-3 py-15 items-center justify-center">
            <h2 className="text-5xl font-bold text-neutral-800">{h1}</h2>
            <p className="text-md py-2 text-neutral-500">{text}</p>
        </div>
    )
}
export default Heading;