import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import Topnav from '../components/topnav'

const MyApp = ({Component, pageProps}) => {
    return (
        <>
        <Topnav/>
         <Component {...pageProps} />
        </>
    )
}
export default MyApp