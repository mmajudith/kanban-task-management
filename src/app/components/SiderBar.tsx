import Link from "next/link"

type SProps = {
    boardNames: string[]
}

const SiderBar = ({ boardNames }: SProps) => {
    return (
        <div>
            <ul>
                {boardNames.map((name:string, index:number) => {
                    const replaceAllSpace = name.replaceAll(' ', '-');
                    return(
                        <Link href={`/${replaceAllSpace}`} key={name}>
                            <li>{name}</li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}

export default SiderBar