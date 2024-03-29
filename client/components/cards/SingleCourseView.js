import {currentFormatter} from '../../utils/helper'
import {Badge, Button } from 'antd'
import ReactPlayer from "react-player"




const SingleCourseView = ({course,
    showModal, setShowModal,
    preview, setPreview, 
    user,
    loading,
    setLoading,
    handlePaidEnrollment,
    handleFreeEnrollment, setEnrolled, enrolled}) => {
    
    const {name, description, instructor, updatedAt, 
        lessons, image, price, paid, category} = course
return(

<div className="container-fluid">
<div className="row mt-1">
    <div className="col-md-8">
        {/* tirtle */} {/* description  category author price updatedAt */}
        <h1 className="text-muted font-weight-bold">{name}</h1>
        <p className="lead">{description && description.substring(0, 160)}....</p>
        {/* {JSON.stringify(course.lessons)} */}
        <Badge
            count={category}
        />
        <p className="text-muted mt-1">
            Created By: {instructor.name}
        </p>
        <p>Last updated: {new Date(updatedAt).toLocaleDateString()}</p>
        <h4 className="text-muted">
            {paid ? currentFormatter({
                amount: price,
                currency: "usd"
            }) : "Free"}
        </h4>
    
    </div> 
    <div className="col-md-4">
        {/* show video preview course image */}
        {/* enroll button */}
        {(course.lessons && course.lessons[0].video && course.lessons[0].video.Location) ?
        (<div onClick={()=> {
            setPreview(lessons[0].video.Location)
            setShowModal(!showModal)
        }}>
            <ReactPlayer url={lessons[0].video.Location}
            controls={true}
            light={image.Location}
            width="100%"
            height="225px"/>
        </div>) : 
        (<div>
            <img src={course.image.Location} alt={name} className="img"/>
        </div>)}
            {loading ? (
                <div className="justify-content-center tent-danger"> </div>
            ) : (
                <Button type="dashed" shape="round" size="large" disabled={loading}
                onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                className="mt-2 btn btn-success">
                    {user ? enrolled.status ? "Go to Course" : "Enroll" : "Login to Enroll"}</Button>
            )}
        

    </div>

</div>
</div>
    )


}
export default SingleCourseView