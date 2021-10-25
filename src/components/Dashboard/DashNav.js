import Nav from "react-bootstrap/Nav";


export default function DashNav() {
    return (
        <Nav variant="pills">
            {/* <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav.Item> */}
            <Nav.Item>
                <Nav.Link eventKey="link-1">Your Farms</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Find a Farm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3">Your Plants</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4">Find a Plant</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-auto">
                <Nav.Link eventKey="link-5">Your Orders</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
