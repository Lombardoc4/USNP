import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import './Dashboard.scss'
import DashLanding from "./DashLanding"
import DashFarm from "./DashFarms"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import Layout from "../Layout"

// TODO: Refactor
export default function Dashboard() {
    let { path, url} = useRouteMatch();
    const Dash = () => (
        <><DashLanding /><Container fluid className="g-0">
            <Row className="g-0">
                <img src="/wholesale-nursery.jpg" alt="" />
            </Row>
        </Container><DashFarm /></>
    )

    console.log(path, url);
    return (
        <Layout>
            <Switch>
                <Route exact path={'/dashboard'}>
                    <Dash/>
                </Route>
                <Route path={'/dashboard/find-plants'}><h1>Test</h1></Route>
            {/* <Route path={`${path}/:topicId`}>
            </Route> */}
            </Switch>
        </Layout>
    )
}