window.addEventListener("load", function () {

    // Sporadic website base URL
    const BASE_URL = "https://sporadic.nz/a01-parttime";

    // Calling required functions
    fetchAndDisplayTable();
    fetchAndDisplayRandom();

    // Task 3 
    // Fetching required data from URL.
    async function fetchAndDisplayTable() {
        const response = await fetch ('https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/types')
        const content = await response.json();
        DisplayTable(content);
    }

    // Function to display the type chart table.
    function DisplayTable(content) {
        let mainContent = document.querySelector("tbody")

        for (let i = 0; i < content.length ; i++) {
            mainContent.innerHTML +=  `<tr>
                                            <th scope="row"> ${content[i].name}</th>
                                            <td>${content[i].data[0]}</td>
                                            <td>${content[i].data[1]}</td>
                                            <td>${content[i].data[2]}</td>
                                            <td>${content[i].data[3]}</td>
                                            <td>${content[i].data[4]}</td>
                                        </tr>`
        }
    }
    
    // Task 4
    // Fetching random data from URL
    async function fetchAndDisplayRandom() {
        const randResponse = await fetch ('https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/summary/random')
        const randContent = await randResponse.json();

        DisplayCard(randContent);
        fetchAndDisplayID(randContent);
    }

    // Function to display information about a random pokemon.
    function DisplayCard(randContent) {
    
        let cardContent = document.querySelector(".card");

        cardContent.innerHTML = `<img class="card-img-top" src="https://trex-sandwich.com/auckland-online-cs719-assignment-01/images/${randContent.imageUrl}">
                                    <div class="card-body">
                                    <h5 class="card-title">${randContent.name}</h5>
                                    <p class="card-text"><b>Types:</b> ${randContent.types}</p>
                                    <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary">More info</button>
                                    <button type="button" onClick="window.location.reload()" class="btn">Randomize</button>
                                    </div>`
    }

    // Task 5
    // Function to fetch data based on the fetchAndDisplayRandom() function's ID, in order to retrieve extended description on pokemon..
    async function fetchAndDisplayID(randContent) {
        const IDResponse = await fetch (`https://trex-sandwich.com/auckland-online-cs719-assignment-01/services/pokemon/detail/${randContent.id}`)
        const IDContent = await IDResponse.json();

        displayModal(IDContent);
    }

    // Function to display a modal window on the randomised pokemon.
    function displayModal(IDContent) {
        console.log(IDContent);
        let modalContent = document.querySelector(".modal-content");

        modalContent.innerHTML = `<div class="modal-header">
                                    <h5 class="modal-title">${IDContent.name}</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    </div>
                                    <div class="modal-body">
                                        <center><img src="https://trex-sandwich.com/auckland-online-cs719-assignment-01/images/${IDContent.imageUrl}" style="width:70%"></center>
                                        <center><p><b>Type:</b> ${IDContent.types}</p></center>
                                        <p>${IDContent.description}</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>`
        }
});