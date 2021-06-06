import {useState} from 'react'

const register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.table({name,email,password})

    }
    return(
        <>
            <h1 className="text-center">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter Name" 
                    required
                    />

                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email" 
                    required
                    />

                    <input type="text" 
                    className="form-control mb-4 p-2" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password" 
                    required
                    />
                    <br />

                    <button className="btn btn-primary"
                    type="submit">Submit</button>

                </form>
            </div>
        </>
    )
}

export default register