function prayerTimes(latitude, longitude) {
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=4')
    .then(response => response.json())
    .then(function(response){
        let today = new Date();
        let index = today.getDate() - 1;
        console.log(response)
        let data = response.data[index].timings;

        let app = document.getElementById('app');
        let table = document.createElement('table');
        let tbody = document.createElement('tbody');

        for(i in data) {
            let row = tbody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);

            name.innerHTML = i;
            time.innerHTML = data[i];
            tbody.appendChild(row);
        }
        
        table.appendChild(tbody);
        app.appendChild(table);
    });
}
function success(Position) {
    prayerTimes(Position.coords.latitude, Position.coords.longitude)
}

function error() {
    prayerTimes("-3.316694", "114.590111")
}

function userLocation() {
    if(!navigator.geolocation) {
        alert("tidak didukung");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
function index() {
    let app = document.getElementById('app');
    let h3 = document.createElement('h3');
    h3.innerHTML = "Prayer Time";

    app.appendChild(h3);

    userLocation();
}
index();