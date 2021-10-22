import { useState, useEffect, forwardRef } from 'react';
import { useForm } from 'react-hook-form';


function IconImg({url, sciName}) {
    return (
        <div style={{marginRight: '1em', width: '8em', height: '8em', overflow: 'hidden', borderRadius: '50%'}}>
            <img style={{width: '100%', height: '100%'}} src={url} alt={sciName}/>
        </div>
    )
}


function NameBox({label, name}){
    // Return List of names with commas, except for last one
    const nameMap = () => (name.map((singleName, index) => (`${singleName.replace(' ', '\xa0')}${index + 1 !== name.length ? ', ' : ''}`)));

    return(
        <p style={{paddingBottom: '1em'}}>
            {label} <br/>
            <span style={{fontWeight: 'bold'}}>
                {Array.isArray(name) && name.length > 1 ? nameMap() : name }</span>
        </p>
    )
}

function PlantNameBox({sciName, comName}) {
    return(
        <div>
            <NameBox label="Scientific Name" name={sciName}/>
            <NameBox label="Common Name" name={comName}/>
        </div>
    )
}

function PlantBox({onClick, imgSrc, scientificName, commonNames}) {
    return(
        <div onClick={onClick} style={{display: "flex", alignItems: "center", padding: "1em", border: '1px solid green'}}>
            <IconImg url={imgSrc}  sciName={scientificName}/>
            <PlantNameBox sciName={scientificName} comName={commonNames}/>
        </div>
    )
}

function PlantTable({children}) {
    return (
        <div style={{width: '100%'}}>
            {children}
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

function Input({ value, setSearchQuery, label, register, required }) {

    return(
        <div>
        {/* <label>{label}</label> */}
            <input placeholder={label} {...register(label, { required, ...value, onChange: (e) => {setSearchQuery(e.target.value)} })} />
        </div>
    )
}



function FilterBar({setFname, fname, searchQuery, setSearchQuery}) {
    const { register, handleSubmit } = useForm({});
    // const [filters, setFilters] = useState({
    //     query: '',
    //     // options: [],
    // })


    const onQuery = (data) => {
        console.log('data', data);
        // setFilters({...filters, query: data});
    };


    return (
        <form style={{display: 'flex', justifyContent:'space-between', alignItems: 'center', padding: '1em 0'}} onSubmit={e => e.preventDefault()}>
            <Input value={searchQuery} setSearchQuery={setSearchQuery} label="Search" register={register}/>
            <div style={{display: 'flex'}}>
                {/* <Select handleChange={handleSubmit(onSubmit)} label="Bloom Time" {...register("Bloom Time")} />
                <Select handleChange={handleSubmit(onSubmit)} label="Life Cycle" {...register("Life Cycle")} />
                <Select handleChange={handleSubmit(onSubmit)} label="Wildlife" {...register("Wildlife")} /> */}
            </div>
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

export default function DatabaseTable() {
    const [allPlants, setAllPlants] = useState([]);
    const [plantList, setPlantList] = useState([]);
    const [detailPlant, setDetailPlant] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        if (allPlants.length === 0) {
            const fetchData = async () => {
                const res = await fetch('/api/plants');
                if (!res) { return 'No Data'}
                return await res.json();
            };

            fetchData().then(data => {
                if (!data){
                    return;
                }
                if (isMounted){
                    setAllPlants(data);    // add conditional check
                    setPlantList(data);
                    setDetailPlant({...data[0]});
                }
            });
        } else {
            setPlantList(filterPlants(allPlants, searchQuery));
        }

        return () => { isMounted = false };

    }, [searchQuery])

    const PlantBoxClick = (index) => {
        setDetailPlant(plantList[index])
    }

    return(
        <>
            {/* {Admin Nav} */}

            <main style={{maxWidth: '80%', margin: 'auto'}}>
                {plantList.length > 0 &&
                <>
                    <FilterBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery} />
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '33%' }}>
                            <DetailPlantView {...detailPlant} />
                        </div>
                        <div style={{ width: '67%' }}>
                            <PlantTable>
                                {plantList.map((plant, index) => <PlantBox onClick={() => PlantBoxClick(index)} key={index} {...plant} />)}
                            </PlantTable>
                        </div>
                    </div>
                </>}
                {plantList?.length === 0 && <h1> No Data Please Login</h1>}

            </main>
        </>
    )
}