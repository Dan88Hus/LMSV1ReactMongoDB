import { CloseCircleFilled } from "@ant-design/icons"
import {Button, Progress} from "antd"
import {useState, useEffect} from 'react'

const UpdateLessonForm = ({current, setCurrent,
     handleVideoUpload, handleUpdateLesson,
    uploadVideoButtonText, 
    uploading, progress,
    }) => {
        


    return (
        <div className="container pt-3">
             <form onSubmit={handleUpdateLesson} className="">
                 <input type="text" className="form-control square"
                 onChange={e => setValues({...current, title: e.target.value})}
                 value={current.title}
                 autoFocus
                 required
                 />

                 <textarea className="form-control mt-3" cols="7" rows="7"
                 onChange={e => setValues({...current, content:e.target.value})}
                 value={current.content}
                 ></textarea>

                <div className="tex-center">
                <label className="btn btn-dark mt-3 text-center">
                    {uploadVideoButtonText}
                    <input onChange={handleVideoUpload} type="file" accept="video/*" hidden />
                </label>
                {!uploading && current.video && current.video.Location && (
                   <div className="justify-content-center">
                       show video player
                   </div>
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
                <div className="justify-content-between">
                    <span className="badge">Preview</span>
                </div>

                 <Button
                 onClick={handleUpdateLesson}
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

export default UpdateLessonForm