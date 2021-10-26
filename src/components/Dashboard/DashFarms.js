import Container from "react-bootstrap/Container"
import  Row  from "react-bootstrap/Row"
import  Col  from "react-bootstrap/Col"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"


const FarmCard = ({farm}) => {
    console.log(farm);
    const img = './logo192.png'
    return (
        <>
            <img src={img} alt={farm.name}/>
            <h4>{farm.name}</h4>
            <p>{farm.address}</p>
        </>
    )
}

const DashFarm = () => {
    const [userFarms, setUserFarms] = useState([]);
    // const [farmIDs, setFarmIDs] = useState(window.localStorage?.farms);
    const farms  = JSON.parse(window.localStorage.farms);


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/api/user/farms',
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
            <Row className="justify-content-center my-5">
                <Col xs lg="6">
                <p className="text-center">Your Farms</p>
                { userFarms.length <= 0 && <h1>This is where the "Add Farms Now" Comes in</h1>}
                </Col>
            </Row>
            { userFarms.length > 0 &&
            <Row md={2} xl={3} >
                {userFarms.map(f => <Col className="text-center"><FarmCard farm={f}/></Col>)}
                                    <li>Farm1</li>
                                    <li>Farm2</li>
                                    <li>Farm3</li>
            </Row>}
        </Container>
    )

}

export default DashFarm