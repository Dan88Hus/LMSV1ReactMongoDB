import {List, Avatar} from 'antd'

const {Item} = List

const SingleCourseLessons = ({
    lessons,setPreview, showModal, setShowModal
}) =>{

    return(
        <>
        <div className="container-fluid">
    <div className="row mt-1">
    <div className="col-md-8">
        {lessons && <h4>{lessons.length} Lessons</h4>}
        <hr />
        <List 
           itemLayout="horizontal"
           dataSource={lessons}
           renderItem={(item, index) => (
               <Item>
                   <Item.Meta
                    avatar={<Avatar>{index+1}</Avatar>}
                    title={item.title}
                   />
                       {item.video && item.video !== null && item.free_preview && (
                           <span style={{cursor: "pointer"}}
                           onClick={()=>{
                               setPreview(item.video.Location)
                               setShowModal(!showModal)
                           }}
                           >
                            Preview
                           </span>
                       )}
                   
               </Item>
           )}
        />
    </div>

</div>
</div>

        </>
        
    )
}
export default SingleCourseLessons