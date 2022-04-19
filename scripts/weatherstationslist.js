function bodyOnLoadWeather()
{
    weather();
    btnNWSGetStationsAsync_Click();
}

function weather() {
    selstates = document.getElementById("selStates");
    divStationsPlaceholder = document.getElementById("divStationsPlaceholder");
}

function btnNWSGetStationsAsync_Click() {
    var base_uri = "https://w1.weather.gov/xml/current_obs/index.xml";
    req = new XMLHttpRequest();

    req.open("GET", base_uri, true);
    req.setRequestHeader("Accept",
        "text / html, application / xhtml + xml, application / xml; q = 0.9,*/*;q=0.8");
    req.onreadystatechange = getStationsCallback;
    req.send();
}

function getStationsCallback() {
    if (this.readyState == 4 && this.status == 200) {

        let MyText = req.responseText;
        let MyXML = req.responseXML;

        processXML(MyXML);
    }
}

function selStates_onChange() {
    selstates = document.getElementById("selStates");
    let stateAbbr = selstates.value;

    let myList = getStations(stateAbbr);
    //let myList = getStations2(stateAbbr);

    displayStationsList(myList, divStationsPlaceholder);
    //displayStationTable(myList, divStationsPlaceholder);
}

let stationsList = [];

function processXML(xmlDoc) {
    let stationsXML = xmlDoc.getElementsByTagName("station");

    for (x = 0; x < stationsXML.length; x++) {

        // Create the parallel object list.
        let station_idXML = stationsXML[x].getElementsByTagName("station_id")[0].innerHTML;
        let stateXML = stationsXML[x].getElementsByTagName("state")[0].innerHTML;
        let station_nameXML = stationsXML[x].getElementsByTagName("station_name")[0].innerHTML;
        let latitudeXML = stationsXML[x].getElementsByTagName("latitude")[0].innerHTML;
        let longitudeXML = stationsXML[x].getElementsByTagName("longitude")[0].innerHTML;
        let xml_urlXML = stationsXML[x].getElementsByTagName("xml_url")[0].innerHTML;

        let station = {
            stationid: station_idXML,
            state: stateXML,
            stationName: station_nameXML,
            latitude: latitudeXML,
            longitude: longitudeXML,
            xmlURL: xml_urlXML
        };
        stationsList.push(station);
    }
}

function getStations(state) {
    let returnList = null;
    returnList = stationsList.filter(
        function (o) { return o.state == state });
    return (returnList);
}

let _hiddenState = null;

function getStations2(state) {
    let returnList = null;
    _hiddenState = state;
    returnList = stationsList.filter(isSameState);
    return (returnList);
}

function isSameState(obj)
{
    let match = obj.state == _hiddenState
    return (match);
}

function getStation(stationid) {
    let returnStation = null;
    returnStation = stationList.find(function (o) { return o.stationid = stationid });
    return (returnStation);
}

function displayStationsList(stationsList, divAttach) {
    let uList = document.createElement("ul2");
    for (x = 0; x < stationsList.length; x++) {

        let stationid = stationsList[x].stationid;
        let state = stationsList[x].state;
        let station_name = stationsList[x].stationName;
        let listItem = stationid + " (" + state + ") - " + station_name;

        let liCurrent = document.createElement("li2");
        liCurrent.innerHTML = listItem;
        uList.appendChild(liCurrent);
    }
    removeAllChildren(divAttach);
    divAttach.appendChild(uList);
}

function createTableHeader(tblArg) {
    let hdrRow = tblArg.insertRow();

    let cellStationId = hdrRow.insertCell();
    cellStationId.appendChild(document.createTextNode("Station Id"));
    hdrRow.appendChild(cellStationId)

    let cellStationName = hdrRow.insertCell();
    cellStationName.appendChild(document.createTextNode("Station Name"));
    hdrRow.appendChild(cellStationName);

    let cellStationState = hdrRow.insertCell();
    cellStationState.appendChild(document.createTextNode("Station State"));
    hdrRow.appendChild(cellStationState);

    let cellLatitude = hdrRow.insertCell();
    cellLatitude.appendChild(document.createTextNode("Latitude"));
    hdrRow.appendChild(cellLatitude);

    let cellLongitude = hdrRow.insertCell();
    cellLongitude.appendChild(document.createTextNode("Longitude"));
    hdrRow.appendChild(cellLongitude);

}

function createTableRow(tblArg, stationIdArg, stationNameArg, stationStateArg, stationLatitudeArg, stationLongitudeArg) {
    let curRow = tblArg.insertRow();

    let cellStationId = curRow.insertCell();
    cellStationId.appendChild(document.createTextNode(stationIdArg));
    curRow.appendChild(cellStationId);

    let cellStationName = curRow.insertCell();
    cellStationName.appendChild(document.createTextNode(stationNameArg));
    curRow.appendChild(cellStationName);

    let cellStationState = curRow.insertCell();
    cellStationState.appendChild(document.createTextNode(stationStateArg));
    curRow.appendChild(cellStationState);

    let cellLatitude = curRow.insertCell();
    cellLatitude.appendChild(document.createTextNode(stationLatitudeArg));
    curRow.appendChild(cellLatitude);

    let cellLongitude = curRow.insertCell();
    cellLongitude.appendChild(document.createTextNode(stationLongitudeArg));
    curRow.appendChild(cellLongitude);
}

function displayStationTable(stationsList, divAttach) {
    let uTable = document.createElement("table");
    createTableHeader(uTable);
    divAttach.appendChild(uTable);

    for (x = 0; x < stationsList.length; x++) {
        createTableRow(uTable,
            stationsList[x].stationid,
            stationsList[x].stationName,
            stationsList[x].state,
            stationsList[x].latitude,
            stationsList[x].longitude);
    }
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}