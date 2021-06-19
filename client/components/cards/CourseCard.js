import {List ,Card, Badge} from 'antd'
import Link from 'next/link'
import {currentFormatter} from '../../utils/helper'


const {Meta} = Card

const CourseCard = ({course}) =>{
    const {name, instructor, price, image, slug, paid, category} = course

    return(
        <>

        <Link href={`/course/${slug}`}>
        <div className="col-auto">
            <a >
                <Card className="mt-2 mb-1"
                cover={image && image.Location ? (<img src={image.Location} alt={name} style={{width: "25%", height: "10%", objectFit: "cover"}}
                className="p-1 bg bg-danger"></img>) : ("No Image")}>
                    <h2 className="font-weight-bold">{name}</h2>
                    <p className="text-muted">by:{instructor.name}</p>
                    <Badge count={category}
                    style={{backgroundColor: "#03a9f4"}}
                    className="pb-2 mr-r"/>
                    <h4 className="bt-2">
                    {paid ? currentFormatter({
                        amount: price,
                        currency: "usd",
                    }) : "Free"}
                    </h4>
                </Card>
            </a>
        </div>
        
        </Link>
                    <h2 className="font-weight-bold">{name}</h2>
                    <p className="text-muted">by:{instructor.name}</p>
        {/* {JSON.stringify(course)} */}

        </>
    )
}

export default CourseCard

 