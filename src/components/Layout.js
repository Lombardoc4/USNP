import Container from "react-bootstrap/Container"
import NavComp from './NavComp';
import { useHistory } from "react-router-dom";

const Layout = ({children}) => {
    const history = useHistory()

    if (!window.localStorage.user) {
        history.replace('/')
    }

    return (
        <>
        <Container className="my-3">
                <NavComp/>
        </Container>
        {children}
        </>
    )
}

export default Layout