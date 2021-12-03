let getStandings = document.getElementById("getStandings")
let messages = document.getElementById("messages")

getStandings.addEventListener('submit', function (event) {
    event.preventDefault();
    let yearValue = document.getElementById("standingYear").value;
    let seasonValue = document.getElementById("standingSeason").value;
    console.log(yearValue);
    console.log(seasonValue);
    fetch(`https://ergast.com/api/f1/${yearValue}/${seasonValue}/driverStandings.json`)
        .then((res) => res.json())
        .catch(() => displayError())
    .then((data) => {
        console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        populateRacers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        
    })
})



// fetch('https://ergast.com/api/f1/2020/1/driverStandings.json')
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
//         populateRacers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        
//     })


function populateRacers(racers) {
    messages.innerHTML = ''
    standingsTableBody.innerHTML = ''

    for (const racer of racers) {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td scope="row">${racer.position}</td>
        <td scope="row">${racer.Driver.givenName} ${racer.Driver.familyName}</td>
        <td scope="row">${racer.Driver.nationality}</td>
        <td scope="row">${racer.Constructors[0].name}</td>
        <td scope="row">${racer.points}</td>
        <td scope="row">${racer.wins}</td>
        <td scope="row">${racer.Driver.permanentNumber}</td>`
        

        standingsTableBody.append(newRow)
    }
}

function displayError() {
    standingsTableBody.innerHTML = ''
    messages.innerText = "Unable to complete request. Make sure you are entering a valid year and season."
}