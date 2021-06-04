// eslint-disable-next-line func-names
(function (doc) {
    const activeFilters = {}
    const data = [
        {
            type:       'Tree',
            name:       'Liriodendron tulipifera',
            commonName: 'Tulip Poplar',
            imgSrc:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Tulip_Tree_NBG_LR.jpg/2560px-Tulip_Tree_NBG_LR.jpg',
            dataSrc:    {
                northCarolina:       'https://plants.ces.ncsu.edu/plants/liriodendron-tulipifera/',
                missouri:             'https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=282514',
                texas: 'https://www.wildflower.org/plants/result.php?id_plant=LITU',
            },
            cutting: {
                months: ['March', 'April', 'October'],
                type: ['Softwood', 'Semi-Hardwood'],
            }
        },
        {
            height:     'low',
            type:       'grass',
            name:       'CarexXX pensylvanica',
            commonName: 'Pennsylvania Sedge',
            imgSrc:     'https://upload.wikimedia.org/wikipedia/commons/1/19/CarexPensylvanica.jpg',
            dataSrc:    {
                northCarolina:       'https://plants.ces.ncsu.edu/plants/carex-pensylvanica/',
                // missouri:             'https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=282514',
                // texas: 'https://www.wildflower.org/plants/result.php?id_plant=LITU',
            },
            cutting: {
                months: ['March', 'April', 'May'],
                // type: ['Softwood', 'Semi-Hardwood'],
            }

        },
        {
            type:       'Tree',
            name:       'Liriodendron tulipifera',
            commonName: 'Tulip Poplar',
            imgSrc:     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Tulip_Tree_NBG_LR.jpg/2560px-Tulip_Tree_NBG_LR.jpg',
            dataSrc:    {
                northCarolina:       'https://plants.ces.ncsu.edu/plants/liriodendron-tulipifera/',
                // missouri:             'https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=282514',
                // texas: 'https://www.wildflower.org/plants/result.php?id_plant=LITU',
            },
            cutting: {
                months: ['March', 'April', 'May'],
                type: ['Softwood', 'Semi-Hardwood'],
            }
        },
        {
            height:     'low',
            type:       'grass',
            name:       'CarexXX pensylvanica',
            commonName: 'Pennsylvania Sedge',
            imgSrc:     'https://upload.wikimedia.org/wikipedia/commons/1/19/CarexPensylvanica.jpg',
            dataSrc:    {
                northCarolina:       'https://plants.ces.ncsu.edu/plants/carex-pensylvanica/',
                // missouri:             'https://www.missouribotanicalgarden.org/PlantFinder/PlantFinderDetails.aspx?taxonid=282514',
                // texas: 'https://www.wildflower.org/plants/result.php?id_plant=LITU',
            },
        },
    ];

    // const closeModal = () => {
    // }
    document.getElementById('close-modal').addEventListener('click', () => {document.getElementById('modal-bg').classList.add('on')})

    // All possible filters
    const createFilterBar = () => {
        const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const currMonth = months[(new Date()).getMonth()];

        // Generate Filter Bar
        const addFilters = () => {
            const filterList = [];

            const activateFilter = (el) => {
                // Dom change
                doc.querySelector('.filterBtn.on').classList.remove('on');
                el.classList.add('on');


                // activeFitlers
                activeFilters.cuttingMonth = el.innerHTML;

                // Update Plant List
                createDataVis();

            };

            // Create a filter for each month
            _.each(months, (filter) => {
                let active = '';
                if (filter === currMonth) {
                    active = 'on';
                    activeFilters.cuttingMonth = currMonth;
                }

                // const active = filter === currMonth() ? 'on' : '';
                filterList.push(<button className={`btn filterBtn ${active}`} onclick={function f() { activateFilter(this) }}>{filter}</button>);
            });

            return (
                <div className="filterBar">
                    {filterList}
                </div>
            );
        }

        doc.getElementById('filterBar').replaceWith(addFilters());
    };

    // Create cards for filtered data
    const createDataVis = () => {
        const allCards = [];
        const filteredData = data.filter(el => el.cutting && el.cutting.months.includes(activeFilters.cuttingMonth));


        _.each(filteredData, el => {
            allCards.push(
                <div  className="card">
                    <img src={el?.imgSrc}/>

                    <div className="card-data">
                        <div className="plant-name">
                            <h3>{el?.name} </h3>
                            <h4>{el?.commonName}</h4>
                        </div>
                        <p>{el.cutting.type && el.cutting.type.length > 0 ? el.cutting.type.join(', ') : ''}</p>
                        <a href={el.dataSrc?.missouri} target="_blank">Missouri Botanical</a><br/>
                        <a href={el.dataSrc?.northCarolina} target="_blank">North Carolina State Uni</a><br/>
                        <a href={el.dataSrc?.texas} target="_blank">Wildflower(Uni Texas @ Austin)</a>
                    </div>
                </div>

            );
        });

        const dataCards = () => {
            return (
                <div  className="deck">
                    {allCards}
                </div>
            )
        }

        doc.getElementById('dataVis').replaceChildren(dataCards());
    };

    const init = () => {
        createFilterBar();
        createDataVis();

        console.log('test', activeFilters);
    }

    init();

}(document));
