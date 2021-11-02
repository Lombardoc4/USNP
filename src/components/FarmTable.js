import { useState, useEffect, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Layout from './Layout';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


function IconImg({url, alt}) {
    return (
        <div style={{margin: '0 auto 1em' , width: '8em', height: '8em', overflow: 'hidden', borderRadius: '50%'}}>
            <img style={{width: '100%', height: '100%'}} src={url} alt={alt}/>
        </div>
    )
}


function NameBox({className, name, label}){
    // Return List of names with commas, except for last one
    const nameMap = () => (name.map((singleName, index) => (`${singleName.replace(' ', '\xa0')}${index + 1 !== name.length ? ', ' : ''}`)));

    return(
        <p className={className}>
            {label && <b>{label}:&nbsp;</b>}
            {Array.isArray(name) && name.length > 1 ? nameMap() : name }

        </p>
    )
}

function FarmNameBox({name, location, specialty}) {

    return(
        <div>
            <NameBox className="h5 mh-48px" name={name}/>
            <div className="mt-auto">

                <NameBox name={location}/>
                {specialty && <NameBox label="Specialty" name={specialty}/>}
            </div>
        </div>
    )
}

function FarmBox({logo, ...props}) {
    return(
        // <div onClick={onClick} style={{display: "flex", alignItems: "center", padding: "1em", border: '1px solid green'}}>
        <div className="p-3 d-flex flex-column">
            <IconImg url={logo}  alt={props.name}/>
            <FarmNameBox {...props}/>
        </div>
    )
}



function DetailImg({url, sciName}) {
    return (
        <div style={{paddingBottom: '1em', width: '100%'}}>
            <img style={{width: '100%', height: '100%', borderRadius: '0.5em'}} src={url} alt={sciName}/>
        </div>
    )
}


function Input({inputRegister, label, className }) {
    return(
        <>
        {/* <label>{label}</label> */}
            <input className={className} placeholder={label} {...inputRegister} />
        </>
    )
}



function FilterBar({searchQuery, setSearchQuery}) {
    const { register, handleSubmit } = useForm({});
    // const [filters, setFilters] = useState({
    //     query: '',
    //     // options: [],
    // })

    const history = useHistory();
    const onChange = (value) => {
        setSearchQuery(value);
        history.replace(history.location.pathname + '?fq=' + value);
    }

    const onQuery = (data) => {
        console.log('data', data);
        // setFilters({...filters, query: data});
    };

    const inputRegister = {value: searchQuery, onChange: (e) => {onChange(e.target.value)} }

    return (
        <form style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: '1em 0'}} onSubmit={e => e.preventDefault()}>

            <Input inputRegister={inputRegister} label="Farm Name" className="w-50" />
            <div style={{display: 'flex'}}>
                {/* <Select handleChange={handleSubmit(onQuery)} label="Bloom Time" {...register("Bloom Time")} />
                <Select handleChange={handleSubmit(onQuery)} label="Life Cycle" {...register("Life Cycle")} />
                <Select handleChange={handleSubmit(onQuery)} label="Wildlife" {...register("Wildlife")} /> */}
            </div>
            {/* <input type="submit" /> */}
        </form>
    );
}


const filterFarms = (list, query) => {
    // console.log(list, query);
    if (!query) {
        return list;
    }

    return list.filter((item) => {
        const itemName = item.name.toLowerCase().includes(query.toLowerCase());
        return itemName;
    });
};

export default function DatabaseTable(props) {
    const query = new URLSearchParams(props.location.search)
    const [allFarms, setAllFarms] = useState([]);
    const [farmList, setFarmList] = useState([]);
    // const [detailPlant, setDetailPlant] = useState({});
    const [searchQuery, setSearchQuery] = useState(query.get('fq') || '');

    useEffect(() => {
        // let isMounted = true;               // note mutable flag
        if (allFarms.length === 0) {
            const fetchData = async () => {
                const options = {};
                if (props.user)  {
                    options.method = "POST"
                    options.body = JSON.stringify({farms: JSON.parse(window.localStorage.farms)});
                    options.headers = {
                        'Content-Type': 'application/json'
                    };
                }
                const apiQuery = props.user ? '/user/farms' : '/farms'
                const res = await fetch('http://localhost:8000/api' + apiQuery, options);
                if (!res) { return 'No Data'}
                return await res.json();
            };

            fetchData().then(data => {
                if (!data){
                    return;
                }
                // if (isMounted){
                    setAllFarms(data);    // add conditional check
                    setFarmList(data);
                    // setDetailPlant({...data[0]});
                // }
            });
        } else {
            setFarmList(filterFarms(allFarms, searchQuery));
        }

        // return () => { isMounted = false };

    }, [allFarms, props.user, searchQuery])

    const clearQuery = () => {
        setSearchQuery('');
        props.history.replace(props.location.pathname)
    }

    return(
        <Layout>
            {/* {Admin Nav} */}

            <main className="container">
                <>
                    <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
                    <Row md={4}>
                        { farmList.length > 0 ?
                            farmList.map((plant, index) => <FarmBox  key={index} {...plant} />)
                            :
                            <div className="w-100 text-center">
                                <p className="fs-3"> No farm by the name:<br/>
                                    <b>{searchQuery}</b>
                                </p>
                                <Button onClick={() => {clearQuery()}}>Clear Search</Button>
                            </div>
                        }
                    </Row>
                </>

            </main>
        </Layout>
    )
}