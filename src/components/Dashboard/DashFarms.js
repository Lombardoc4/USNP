import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Col  from "react-bootstrap/Col"
import  Button  from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'


const FarmCard = ({farm}) => {
    console.log(farm);
    const img = './logo192.png'
    return (
        <Col key={farm.name}>
            <img className="m-auto mt-0" src={img} alt={farm.name}/>
            <h4>{farm.name}</h4>
            <p>{farm.location}<br/>
            3-4 Day Shipping</p>
        </Col>
    )
}

const DashFarm = () => {
    const [userFarms, setUserFarms] = useState([]);
    const history = useHistory();
    // const [farmIDs, setFarmIDs] = useState(window.localStorage?.farms);




    useEffect(() => {
        if (!window.localStorage.farms) {
            return history.replace('/');
        }
        const farms  = JSON.parse(window.localStorage.farms);
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/api/user-dash/farms',
            {
                method: 'POST',
                body: JSON.stringify({farms: farms}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!res) { return 'No Data'}
            return await res.json();
        };

        console.log('far', farms);
        if (farms) {
            fetchData().then(data => {
                if (!data){
                    console.log('no-data')
                    return;
                }
                console.log(data);
                setUserFarms(data);
            });
        }
    }, [])

    return (
        <Container className="my-5">
            <Row className="justify-content-center mt-5">
                <Col xs lg="6">
                <h2 className="text-center">Your Farms</h2>
                { userFarms.length <= 0 && <h1>This is where the "Add Farms Now" Comes in</h1>}
                </Col>
            </Row>
            { userFarms.length > 0 &&
            <Row md={2} xl={4} >
                {userFarms.map(f => <FarmCard key={f.name} farm={f}/>)}
            </Row>}
            <Link to="/my-farms"><Button variant="info" className="mt-3 w-100">See all Farms</Button></Link>

        </Container>
    )

}

export default DashFarm