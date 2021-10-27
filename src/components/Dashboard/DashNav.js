import Nav from "react-bootstrap/Nav";
import { useHistory, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

export default function DashNav() {
    const history = useHistory();
    const logout = () => {
        window.localStorage.clear();
        history.push("/");
    }

    return (
        <Nav variant="pills">
            {/* <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
                <Nav.Link eventKey="link-4">
                    <Link to="/find-plants">Find a Plant</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">
                    <Link to="/find-farms">Find a Farm</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">
                    <Link to="/your-farms">Your Plant</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">
                    <Link to="/your-farms">Your Farms</Link>
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
                <Nav.Link eventKey="link-5">Your Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
                <Nav.Link onClick={logout}>Sign Out</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
