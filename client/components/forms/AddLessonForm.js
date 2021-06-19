import { CloseCircleFilled } from "@ant-design/icons"
import {Button, Progress} from "antd"
import {useState, useEffect} from 'react'

const AddLessonForm = ({values, setValues, handleAddLesson, uploading, setUploading,
    uploadButtonText, handleVideo, progress, handleVideoRemove}) => {
        


    return (
        <div className="container pt-3">
             <form onSubmit={handleAddLesson} className="">
                 <input type="text" className="form-control square"
                 onChange={e => setValues({...values, title: e.target.value})}
                 value={values.title}
                 placeholder="Title"
                 autoFocus
                 required
                 />

                 <textarea className="form-control mt-3" cols="7" rows="7"
                 onChange={e => setValues({...values, content:e.target.value})}
                 value={values.content}
                 placeholder="Content"
                 ></textarea>

                <div className="tex-center">
                <label className="btn btn-dark mt-3 text-center">
                    {uploadButtonText}
                    <input onChange={handleVideo} type="file" accept="video/*" hidden />
                </label>
                {!uploading && values.video.Location && (
                    <span
                    onClick={handleVideoRemove}
                    ><CloseCircleFilled className="text-danger" style={{paddingTop: "-10px  ",cursor: "pointer"}}/>
                    </span>
                )}
                </div>
                
                <br />
                {progress>0 && (
                    <Progress className="justify-content-center"
                    percent={progress}
                    steps={10}
                    />
                ) }
                <br />

                 <Button
                 onClick={handleAddLesson}
                 className="col mt-3"
                 size="large"
                 type="primary"
                 loading={uploading}
                 shape="round">
                     Save
                 </Button>
             </form>
        </div>
    )
}

export default AddLessonForm