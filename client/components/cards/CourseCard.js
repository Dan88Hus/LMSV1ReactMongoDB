import {List ,Card, Badge} from 'antd'
import Link from 'next/link'

// const {Meta} = Card
const {Item} = List

const CourseCard = ({course}) =>{
    const {name, instructor, price, image, slug, paid, category} = course

    return(
        <>
        <Link href={`/course/${slug}`}>
            <a >
                <Card className="mb-1"
                cover={image && image.Location ? (<img src={image.Location} style={{width: "320px", height: "200px", objectFit: "cover"}}
                className="p-1"></img>) : ("No Image")}>
                    <h2 className="font-weight-bold">{name}</h2>
                    <p className="text-muted">by:{instructor.name}</p>
                </Card>
            </a>
        </Link>
        {/* {JSON.stringify(course)} */}

        </>
    )
}

export default CourseCard