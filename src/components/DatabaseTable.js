import { useState, useEffect, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

function IconImg({url, sciName}) {
    return (
        <div style={{marginRight: '1em', width: '8em', height: '8em', overflow: 'hidden', borderRadius: '50%'}}>
            <img style={{width: '100%', height: '100%'}} src={url} alt={sciName}/>
        </div>
    )
}

function NameBox({className, name, label}){
    // Return List of names with commas, except for last one
    const nameMap = () => (name.map((singleName, index) => (`${singleName.replace(' ', '\xa0')}${index + 1 !== name.length ? ', ' : ''}`)));

    return(
        <p className={className}>
            {label && <b>{label}:&nbsp;</b>}
            <span>
                {Array.isArray(name) && name.length > 1 ? nameMap() : name }</span>
        </p>
    )
}

function PlantNameBox({sciName, comName, varieties}) {
    return(
        <div>
            <NameBox className="h5" name={sciName}/>
            <NameBox name={comName}/>
            {varieties && <NameBox label="Varieties" name={varieties}/>}
        </div>
    )
}

function PlantBox({onClick, imgSrc, scientificName, commonNames, varieties}) {
    return(
        <ListGroup.Item onClick={onClick} className="d-flex align-items-center p-3">
            <IconImg url={imgSrc}  sciName={scientificName}/>
            <PlantNameBox sciName={scientificName} comName={commonNames} varieties={varieties}/>
        </ListGroup.Item>
    )
}

function DetailImg({url, sciName}) {
    return (
        <div style={{paddingBottom: '1em', width: '100%'}}>
            <img style={{width: '100%', height: '100%', borderRadius: '0.5em'}} src={url} alt={sciName}/>
        </div>
    )
}

function DetailPlantView({imgSrc, scientificName, commonNames, bloomTime, lifeCycle, wildlife}){
    return(
        <div style={{padding: "1em", border: '1px solid green'}}>
            <DetailImg url={imgSrc}  sciName={scientificName}/>
            <NameBox label="Scientific Name" name={scientificName}/>
            <NameBox label="Common Names" name={commonNames}/>
            <NameBox label="Bloom Time" name={bloomTime}/>
            <NameBox label="Life Cycle" name={lifeCycle}/>
            <NameBox label="Wildlife" name={wildlife}/>
        </div>
    )
}

const Select = forwardRef(({ handleChange, onBlur, name, label }, ref) => (
      <select defaultValue='' style={{margin: '1em'}} name={name} ref={ref} onChange={handleChange} onBlur={onBlur}>
        <option value='' disabled>{label}</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
  ));

function Input({inputRegister, label, className }) {
    return(
        <>
        {/* <label>{label}</label> */}
            <input className={className} placeholder={label} {...inputRegister} />
        </>
    )
}



function FilterBar({searchQuery, setSearchQuery}) {

    const history = useHistory();
    const onChange = (value) => {
        setSearchQuery(value);
        history.push(history.location.pathname + '?pq=' + value);
    }

    const inputRegister = {value: searchQuery, onChange: (e) => {onChange(e.target.value)} }

    return (
        <form style={{display: 'flex', alignItems: 'center', padding: '1em 0'}} onSubmit={e => e.preventDefault()}>

            <Input inputRegister={inputRegister} label="Scientific/Common Name" className="w-50" />
            <div style={{display: 'flex'}}>
                {/* <Select handleChange={handleSubmit(onQuery)} label="Bloom Time" {...register("Bloom Time")} />
                <Select handleChange={handleSubmit(onQuery)} label="Life Cycle" {...register("Life Cycle")} />
                <Select handleChange={handleSubmit(onQuery)} label="Wildlife" {...register("Wildlife")} /> */}
            </div>
            <Button size="sm" className="mx-3" onClick={() => {onChange('')}} variant="outline-secondary">Clear</Button>
            {/* <input type="submit" /> */}
        </form>
    );
}


const filterPlants = (list, query) => {
    // console.log(list, query);
    if (!query) {
        return list;
    }

    return list.filter((item) => {
        const itemSciName = item.scientificName.toLowerCase().includes(query.toLowerCase());
        const itemComName = item.commonNames.filter(subItem => subItem.toLowerCase().includes(query.toLowerCase())).length > 0;
        return itemSciName || itemComName;
    });
};

export default function DatabaseTable( props ) {
    const query = new URLSearchParams(props.location.search)
    const [allPlants, setAllPlants] = useState([]);
    const [plantList, setPlantList] = useState([]);
    const [detailPlant, setDetailPlant] = useState({});
    const [searchQuery, setSearchQuery] = useState(query.get('pq') || '');

    useEffect(() => {
        // let isMounted = true;               // note mutable flag
        if (allPlants.length === 0) {
            const fetchData = async () => {
                const options = {}
                if (props.user)  {
                    options.method = "POST"
                    options.body = JSON.stringify({farms: JSON.parse(window.localStorage.farms)});
                    options.headers = {
                        'Content-Type': 'application/json'
                    };
                }
                const apiQuery = props.user ? '/user/plants' : '/plants'
                const res = await fetch('http://localhost:8000/api' + apiQuery, options);
                if (!res) { return 'No Data'}
                return await res.json();
            };

            fetchData().then(data => {
                if (!data){
                    return;
                }
                // if (isMounted){
                    setAllPlants(data);    // add conditional check
                    setPlantList(data);
                    setDetailPlant({...data[0]});
                // }
            });
        } else {
            setPlantList(filterPlants(allPlants, searchQuery));
        }

        // return () => { isMounted = false };

    }, [allPlants, searchQuery])

    const PlantBoxClick = (index) => {
        setDetailPlant(plantList[index])
    }

    return(
        <Layout>
            {/* {Admin Nav} */}

            <main className="container">
                <>
                    <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '67%' }}>
                            { plantList.length > 0 ?
                                <ListGroup variant="flush">
                                    {plantList.map((plant, index) => <PlantBox onClick={() => PlantBoxClick(index)} key={index} {...plant} />)}
                                </ListGroup>
                                :
                                <p className="fs-3 text-center"> No plants by the name:<br/>
                                    <b>{searchQuery}</b>
                                </p>
                            }
                        </div>
                        <div style={{ width: '33%' }}>
                            <DetailPlantView {...detailPlant} />
                        </div>
                    </div>
                </>

            </main>
        </Layout>
    )
}