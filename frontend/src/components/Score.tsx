export default function Score(props: { onChange: (score: number) => void, value: number }) {
    return (
        <>
            <div className="rating pt-3">
                <input type="radio" name="rating-2" className="rating-hidden" checked = {props.value==0} readOnly />
                <input onChange={() => props.onChange(1)} checked={props.value == 1} type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />
                <input onChange={() => props.onChange(2)} checked={props.value == 2} type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />
                <input onChange={() => props.onChange(3)} checked={props.value == 3} type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />
                <input onChange={() => props.onChange(4)} checked={props.value == 4} type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />
                <input onChange={() => props.onChange(5)} checked={props.value == 5} type="radio" name="rating-2" className="mask mask-star-2 bg-accent" />
            </div>
        </>
    )
}