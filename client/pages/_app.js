import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Topnav from '../components/topnav'


const MyApp = ({Component, pageProps}) => {
    return (
        <>
        <ToastContainer />
        <Topnav/>
         <Component {...pageProps} />
        </>
    )
}
export default MyApp