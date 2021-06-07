// eslint-disable-next-line func-names
(function (doc) {
    const $ = {
        plantdb: document.getElementById('plantdb'),
        filterBar: document.getElementById('filterBar'),
    };




    const addPlant = () => {

    }

    const loadPlant = (plantData) => {
        console.log(plantData);
        // const plantFilter = `.filter[data-filter=${plantData.height}]`;
        // const plantDeck = `div.plant-deck[data-type=${plantData.type}]`;
        // const plantCard = `${plantDeck} div.plant-card[data-sn=${plantData.scientificName.replace(' ', '-')}]`;

        // // If section for height doesnt exist create it
        // if (!doc.querySelector(plantFilter)) {
        //     // const newSection = _.createEl('div', { class: 'section', 'data-section': plantData.height });
        //     $.filterBar.append(_.createEl('h2', { class: 'filter', 'data-filter': plantData.height }, plantData.height.toUpperCase()));
        //     // $.plantdb.append(newSection);
        // }

        // // If Deck for type doesnt exist create it
        // if (!doc.querySelector(plantDeck)) {
        //     const newDeck = _.createEl('div', { class: 'plant-deck', 'data-type': plantData.type });
        //     newDeck.append(_.createEl('h2', { class: 'deck-title' }, plantData.type));
        //     $.plantdb.append(newDeck);
        // }

        // // If card for plant doesnt exist create it
        // if (!doc.querySelector(plantCard)) {
        //     const newCard = doc.getElementById('card-template').content.cloneNode(true);
        //     newCard.querySelector('div.plant-card').setAttribute('data-sn', plantData.name.replace(' ', '-'));
        //     newCard.querySelector('img').src = plantData.imgSrc;
        //     newCard.querySelector('h3').innerHTML = plantData.name;
        //     newCard.querySelector('h4').innerHTML = plantData.commonName;
        //     _.each(plantData.dataSrc, (link, title) => {
        //         newCard.querySelector('.card-data').append(_.createEl('a', { href: link, target: '_blank' }, title));
        //     });
        //     doc.querySelector(plantDeck).append(newCard);
        // }
    };

    const getPlant = (e) => {
        if (!e.keyCode == 13){
            console.log('testing');
            return;
        }

        document.getElementById('addPlantInput').removeEventListener('keydown', getPlant);

        // Form validation
        console.log('it worked');
        const plantName = e.target.value;
        const plantQuery = plantName.toLowerCase().replace(/\s/g,"-");
        fetch(`api/plants/${plantQuery}`)
        .then(response => response.json())
        .then(data=> {
            $.plantdb.innerHTML = '';
            document.getElementById('addPlantInput').addEventListener('keydown', getPlant);
            if (data.length === 0){
                $.plantdb.innerHTML = `${e.target.value} doesn\'t exist lets add it`;
                return;
            }

            _.each(data, plant =>{
                loadPlant(plant);
            });

        });

    };

    const getAllPlants = () => {
        fetch('api/plants/')
        .then(response => response.json())
        .then(data=> {
            $.plantdb.innerHTML = '';
            if (data.length === 0){
                $.plantdb.innerHTML = 'Nothing To Do';
                return;
            }

            _.each(data, plant =>{
                loadPlant(plant);
            })
        });
    }




    const toggleSearchAdd = () => {
        document.getElementById('addPlantForm').classList.toggle('d-none');
        document.getElementById('plantViewport').classList.toggle('d-none');
        document.getElementById('searchPlantBtn').classList.toggle('d-none');

        document.getElementById('addPlantBtn').blur();
        document.getElementById('addPlantBtn').removeEventListener('click', toggleSearchAdd);
        document.getElementById('addPlantBtn').addEventListener('click', addPlantInit);

    }

    const addPlantInit = () => {
        const sciName = document.querySelector('#addPlantForm input[name=scientificName]').value;
        const comName = document.querySelector('#addPlantForm input[name=commonName]').value
        console.log('addPlant - Get Form Data', [sciName, comName]);
        // Check db data received to see if plant exists
        // if exists, show
        // else
        // go to different page



        const toggleForm = () => {
            document.getElementById('landing').classList.toggle('d-none')
            document.getElementById('addPlant').classList.toggle('d-none')
        }


        document.getElementById('addPlantName').innerHTML= '';
        document.getElementById('addPlantName').append(<div className="w-33"><h2 id="formSciName" class="">Scientific Name: </h2><p>{sciName}</p></div>);
        document.getElementById('addPlantName').append(<div className="w-33"><h2 id="formComName" class="">CommonName: </h2><p>{comName}</p></div>);


        _.each(document.getElementsByClassName('goHome'), el => {
            el.addEventListener('click', toggleForm);
            el.addEventListener('click', toggleSearchAdd);
            el.addEventListener('click', function f() {

                this.removeEventListener('click', toggleForm);
                this.removeEventListener('click', toggleSearchAdd);

            document.getElementById('addPlantBtn').addEventListener('click', toggleSearchAdd);
            document.getElementById('addPlantBtn').removeEventListener('click', addPlantInit);
            });
        })

        // Init form
        toggleForm();


    }

    const init = () => {
        // getAllPlants();


        document.getElementById('addPlantBtn').addEventListener('click', toggleSearchAdd);

        document.getElementById('searchPlantBtn').addEventListener('click', toggleSearchAdd);
        document.getElementById('searchPlantBtn').addEventListener('click', () => {
            document.getElementById('addPlantBtn').addEventListener('click', toggleSearchAdd);
            document.getElementById('addPlantBtn').removeEventListener('click', addPlantInit);
        });
        // document.getElementById('addPlantInput').addEventListener('keydown', getPlant);

        window.addEventListener('scroll', () => {
            const mainNav = doc.getElementById('mainNav');
            window.scrollY >= 10 ? mainNav.classList.add('on') : mainNav.classList.remove('on');
        });
    }

    init();

}(document));
