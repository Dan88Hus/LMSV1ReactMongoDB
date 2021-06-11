import {useState, useEffect} from 'react'
import axios from 'axios'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import {Select, Button} from "antd"

const{Option} = Select

const CourseCreate = () =>{
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "9.99",
        uploading: false,
        paid: true,
        loading: false,
        imagePreview: ""
    })

    const handleChange = (e)=>{
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleImage = () => {

    }

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(values)
    }

    const courseCreateForm = ()=>{
        return (
        <form onSubmit={handleSubmit} >
            <div className="form-group">
                <input type="text" name="name" className="mb-2 form-control"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}/>
            </div>

            <div className="form-group">
                <textarea type="text" name="description" cols="7" rows="7" className="mb-2 form-control"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}/>
            </div>

            <div className="form-row">
                <div className="col">
                    <div className="form-group">
                        <Select 
                        // name="paid"
                        style={{width: "100%"}}
                        size="large"
                        value={values.paid}
                        onChange={v => setValues({...values, paid: !values.paid})}>
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>

                        </Select>

                        <div className="form-row">
                            <div className="col">
                                <div className="form-group">
                                    <label className="btn btn-outline text-start">
                                        {values.loading ? "Uploading"  : "Image Upload"}
                                        <input type="file" name="image" 
                                        onChange={handleImage}
                                        accept="image/*"
                                        hidden />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Button
                                onClick={handleSubmit}
                                disabled={values.loading || values.uploading}
                                className="btn btn-block mt-2"
                                loading={values.loading}
                                type="primary"
                                size="large"
                                shape="round"
                                >
                                    {values.loading ? "Saving..." : "Save&Continue"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </form>
        )
    }

    return (
        <InstructorRoute>
        <h1 className="text-center">Create Course</h1>
        <div className="p-3">
            {courseCreateForm()}
            {/* <pre>{JSON.stringify(values)}</pre> */}
        </div>
        </InstructorRoute>
    )
}
export default CourseCreate