import {Select, Button, Avatar, Badge} from "antd"

const {Option} = Select

const CourseCreateForm = ({handleChange,handleImage,handleSubmit, values, setValues, preview, uploadButtonText, handleImageRemove})=> {
    const children=[]
    for (let i=9.99; i<= 100.99; i++){
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }

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

        <div className="row">
            <div className="col-auto">
                    <Select 
                    style={{width: "100%"}}
                    size="large"
                    value={values.paid}
                    onChange={v => setValues({...values, paid: v, price: 0})}>
                        <Option value={true}>Paid</Option>
                        <Option value={false}>Free</Option>
                    </Select>
            </div>
            {values.paid && <div className="col-auto">
                <div className="form-group">
                    <Select defaultValue="9.99"
                    style={{width: "100%"}}
                    onChange={v => setValues({...values, price: v})}
                    tokenSeparators={[,]}
                    size="large"
                    >
                        {children}
                    </Select>
                </div>
            </div>
            }
        </div>

        <div className="form-group mt-2">
            <input type="text" name="category" className="mb-2 form-control"
            placeholder="Category"
            value={values.category}
            onChange={handleChange}/>
        </div>


        <div className="row">
            <div className="col-auto">
                <div className="form-group">
                    <label className="btn btn-outline text-start mt-1 mb-1">
                        {uploadButtonText}
                        <input type="file" name="image" 
                        onChange={handleImage}
                        accept="image/*"
                        hidden />
                    </label>
                </div>
            </div>
            {preview && (<div className="col-auto">
            <Badge
            count="X"
            onClick={handleImageRemove}
            style={{cursor: "pointer"}}
            ><Avatar width={200} src={preview}/></Badge>
            </div>

            )}
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
    </form>

    )
}
export default CourseCreateForm