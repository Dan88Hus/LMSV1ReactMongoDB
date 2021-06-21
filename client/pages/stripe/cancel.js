import UserRoute from '../../components/routes/UserRoute'

const StripeCancel = ()=>{
    return(
        <UserRoute showNav={false}>
            <div className="row text-center">
                <div className="col">
                    <p className="lead">Payment Failed </p>
                </div>
            </div>
        </UserRoute>
    )
}
export default StripeCancel