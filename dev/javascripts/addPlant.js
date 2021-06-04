// eslint-disable-next-line func-names
(function (doc) {

    const updateForm = () => {

    }

    // Validate Form
    // const validate () => {}

    // Check to see if data already exists
    const dataCheck = async () => {

        fetch('/api/')
            .then(response => response.json())
            .then(data=> {

                if (data.length === 0){
                    doc.getElementById('addPlantPage').replaceChildren(<div>No Data</div>);

                } else {
                    doc.getElementById('addPlantPage').innerHTML = '';
                    _.each(data, plantName => {
                        doc.getElementById('addPlantPage').append(<div>{plantName.scientificName}</div>)
                    })
                    // console.log('data', data);
                }
            });
        // let res = await fetch('./data');
        // console.log(res.data);
    }

    const submitForm = async () => {
        const name = document.querySelector('[name="scientificName"]').value;
        const addPlantPage = doc.getElementById('addPlantPage');

        addPlantPage.classList.remove('d-none');
        // console.log(name);
        let plant = {
            scientificName: name
        };

            const route = `/api/add-plant/${name}`
            let response = await fetch(route, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(plant)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);

                    if (res.new === true)
                        addPlantPage.replaceChildren(<div>Let's add some more details to the {res.scientificName}<input type="button" value="yes"/><input type="button" value="No"/></div>)
                    else
                        addPlantPage.replaceChildren(<div>The {res.scientificName} exists, want to update it?<input type="button" value="yes"/><input type="button" value="No"/></div>)
                });

        //   let result = await
            // .then(res => {});
    }


    _.each(doc.querySelectorAll('#addPlantForm input'), (el) => {
        el.addEventListener('keydown', (e) => {
            // e.preventDefault();
            if (e.keyCode == 13){
                submitForm();
                // console.log(e.target.value)
             }
          }, false)
    });


    const init = () => {
        dataCheck();

        // doc.getElementById('addPlantPage').replaceWith(<div>This is a test</div>);

        // console.log(activeFilters);
    }

    init();

}(document));
