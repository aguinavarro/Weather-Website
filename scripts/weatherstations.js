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
    let change = 0;
    selstates = document.getElementById("selStates");
    let stateAbbr = selstates.value;

    let myList = getStations(stateAbbr);
    //let myList = getStations2(stateAbbr);

    //displayStationsList(myList, divStationsPlaceholder);
    if (change == 0)
    {
        document.getElementById('hide').style.display='block';
        change = 1;
    }
    displayStationTable(myList, divStationsPlaceholder);
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
            stationLatitude: latitudeXML,
            stationLongitude: longitudeXML,
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
        let station_latitude = stationsList[x].stationLatitude;
        let station_longitude = stationsList[x].stationLongitude;
        let listItem = stationid + " (" + state + ") - " + station_name + "        " + station_latitude + ", " + station_longitude;

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
    let cellStationName = hdrRow.insertCell();
    let cellStationState = hdrRow.insertCell();
    let cellLatitude = hdrRow.insertCell();
    let cellLongitude = hdrRow.insertCell();

    cellStationId.appendChild(document.createTextNode("Station Id"));
    hdrRow.appendChild(cellStationId)

    cellStationName.appendChild(document.createTextNode("Station Name"));
    hdrRow.appendChild(cellStationName);

    cellStationState.appendChild(document.createTextNode("Station State"));
    hdrRow.appendChild(cellStationState);

    cellLatitude.appendChild(document.createTextNode("Latitude"));
    hdrRow.appendChild(cellLatitude);

    cellLongitude.appendChild(document.createTextNode("Longitude"));
    hdrRow.appendChild(cellLongitude);
}

function createTableRow(tblArg, stationIdArg, stationNameArg, stationStateArg, stationLatitudeArg, stationLongitudeArg) {
    let curRow = tblArg.insertRow();
    let cellStationId = curRow.insertCell();
    let cellStationName = curRow.insertCell();
    let cellStationState = curRow.insertCell();
    let cellLatitude = curRow.insertCell();
    let cellLongitude = curRow.insertCell();

    cellStationId.appendChild(document.createTextNode(stationIdArg));
    curRow.appendChild(cellStationId);

    cellStationName.appendChild(document.createTextNode(stationNameArg));
    curRow.appendChild(cellStationName);

    cellStationState.appendChild(document.createTextNode(stationStateArg));
    curRow.appendChild(cellStationState);

    cellLatitude.appendChild(document.createTextNode(stationLatitudeArg));
    curRow.appendChild(cellLatitude);
    
    cellLongitude.appendChild(document.createTextNode(stationLongitudeArg));
    curRow.appendChild(cellLongitude);
}

function displayStationTable(stationsList, divAttach) {
    let uTable = document.getElementById("stationTable");
    uTable.innerHTML = "";
    uTable.setAttribute('padding','15px');
    createTableHeader(uTable);
    divAttach.appendChild(uTable);

    for (x = 0; x < stationsList.length; x++) {
        createTableRow(uTable,
            stationsList[x].stationid,
            stationsList[x].stationName,
            stationsList[x].state,
            stationsList[x].stationLatitude,
            stationsList[x].stationLongitude);
    }
}

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}