import { CloseCircleFilled } from "@ant-design/icons"
import {Button, Progress, Switch} from "antd"
import {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'

const UpdateLessonForm = ({current, setCurrent,
     handleVideoUpload, handleUpdateLesson,
    uploadVideoButtonText, 
    uploading, progress,
    }) => {
        


    return (
        <div className="container pt-3">
             <form onSubmit={handleUpdateLesson} className="">
                 <input type="text" className="form-control square"
                 onChange={e => setCurrent({...current, title: e.target.value})}
                 value={current.title}
                 autoFocus
                 required
                 />

                 <textarea className="form-control mt-3" cols="7" rows="7"
                 onChange={e => setCurrent({...current, content:e.target.value})}
                 value={current.content}
                 ></textarea>

                <div className="tex-center">
                <label className="btn btn-dark mt-3 text-center">
                    {uploadVideoButtonText}
                    <input onChange={handleVideoUpload} type="file" accept="video/*" hidden />
                </label>
                {!uploading && current.video && current.video.Location && (
                   <div className="justify-content-center">
                       <ReactPlayer 
                       url={current.video.Location}
                       width="410px"
                       height="240px"
                       controls/>
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
                {/* {JSON.stringify(current)} */}
                <div className="row justify-content-between">
                    <div className="col h6 text-muted">Preview</div>
                    <Switch className="col-auto float-end"
                    disabled={uploading}
                    defaultChecked={current.free_preview}
                    name="free_preview"
                    onChange={v => setCurrent({...current, free_preview: v})}/>
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