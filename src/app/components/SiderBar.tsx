import Link from "next/link"

type SProps = {
    boardNames: string | string[]
}

const SiderBar = ({ boardNames }: SProps) => {
    console.log(boardNames, 'sisssssssssssssssssssssssss')
    return (
        <div>
            <ul>
                {Array.isArray(boardNames) ? (
                    <>
                        {boardNames?.map((name:string, index:number) => {
                            const replaceAllSpace = name.replaceAll(' ', '-');
                            return(
                                <Link href={index === 0 ? `/` : `/${replaceAllSpace}`} key={`${name}${index}`}>
                                    <li>{name}</li>
                                </Link>
                            )
                        })}
                    </>
                ) : (
                    <li>{boardNames}</li>
                )}
            </ul>
            <p>Create board</p>
        </div>
    )
}

export default SiderBar