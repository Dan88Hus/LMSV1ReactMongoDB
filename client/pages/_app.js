import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../components/cards/Card.css'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Provider} from '../context/index'
import Topnav from '../components/topnav'


const MyApp = ({Component, pageProps}) => {
    return (
        <Provider>
        <ToastContainer />
        <Topnav/>
         <Component {...pageProps} />
        </Provider>
    )
}
export default MyApp