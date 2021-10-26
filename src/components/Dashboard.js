import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import './Dashboard/Dashboard.scss'
import DashNav from "./Dashboard/DashNav"
import DashLanding from "./Dashboard/DashLanding"
import DashFarm from "./Dashboard/DashFarms"

// TODO: Refactor
export default function Dashboard() {
    return (
    <>
            <Container className="my-3">
                <DashNav/>
            </Container>
            <DashLanding/>
            <Container fluid className="g-0">
                <Row className="g-0">
                    <img src="/wholesale-nursery.jpg" alt=""/>
                </Row >
            </Container>
            <DashFarm/>
        </>
    )
}