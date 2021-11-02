import Nav from "react-bootstrap/Nav";
import { useHistory, Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button'

export default function NavComp
() {
    const history = useHistory();
    const logout = () => {
        window.localStorage.clear();
        history.push("/");
    }

    return (
        <Nav variant="pills">
            <Nav.Item>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/find-plants">
                        Find Plants
                </Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/find-farms">Find a Farm</Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
                <Link className="nav-link" to="/my-farms">Your Plants</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/my-farms">Your Farms</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className="nav-link" to="/your-orders">Your Orders</Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
                <Nav.Link onClick={logout}>Sign Out</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
