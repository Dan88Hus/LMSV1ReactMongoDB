import {Button} from "antd"
import {useState, useEffect} from 'react'

const AddLessonForm = ({values, setValues, handleAddLesson, uploading, setUploading,
    uploadButtonText, handleVideo}) => {
        

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

                <label className="btn btn-dark mt-3 text-center">
                    {uploadButtonText}
                    <input onChange={handleVideo} type="file" accept="video/*" hidden />
                </label>
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