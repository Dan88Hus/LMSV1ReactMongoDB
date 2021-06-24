import {List ,Card, Badge, Col, Row} from 'antd'
import Link from 'next/link'
import {currentFormatter} from '../../utils/helper'


const {Meta} = Card

const CourseCard = ({course}) =>{
    const {name, instructor, price, image, slug, paid, category} = course

    return(
        <>
<div className="site-card-wrapper">

        <Link href={`/course/${slug}`}>
            <a >
            <Row gutter={0}> 
            <Col span={50}> 
                <Card className="mt-2 mb-1"
                style={{width: "50%", height: "50%"}}
                cover={image && image.Location ? (<img src={image.Location} alt={name}
                className="p-1 bg bg-danger"></img>) : ("No Image")}>
                    <Meta title={name} description={`by:${instructor.name}`}
                    style={{width: "1000%"}}
                    />
                    <br />
                    <Badge count={category}
                    style={{backgroundColor: "#03a9f4"}}
                    className="pb-2"/>
                    <h4 className="bt-2">
                    {paid ? currentFormatter({
                        amount: price,
                        currency: "usd",
                    }) : "Consignee"}
                    </h4>
                </Card>
                </Col>
                </Row>
            </a>
        
        </Link>
                    {/* <h2 className="font-weight-bold">{name}</h2> */}
                    {/* <p className="text-muted">by:{instructor.name}</p> */}
                    {/* </div> */}
</div>
        </>
    )
}

export default CourseCard

 