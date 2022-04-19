function bodyOnLoadCalc()
{
    inputF = document.getElementById("txtInputF");
    inputRH1 = document.getElementById("txtInputRH1");
    outputDP1 = document.getElementById("txtOutputDP1");

    inputC = document.getElementById("txtInputC");
    inputRH2 = document.getElementById("txtInputRH2");
    outputDP2 = document.getElementById("txtOutputDP2");

}
function btnFClick() {
    let outputNumDP1;
    let outputStringDP1;
    let tempF;
    let tempRH1;

    if (isFloatInRange(inputF.value, -459.67, 1000000000) && isFloatInRange(inputRH1.value, 0, 100))
    {
        tempF = parseFloat(inputF.value);
        tempRH1 = parseFloat(inputRH1.value);
    }

    let celsius;
    let tempDP1;

    if (!isNaN(tempF) && (!isNaN(tempRH1))) {
        celsius = (tempF - 32) * 5 / 9;

        tempDP1 = celsius - ((100 - tempRH1) / 5);
        outputNumDP1 = (tempDP1 * 9 / 5) + 32;
        outputStringDP1 = "The dew point given these values is " + outputNumDP1.toFixed(2) + " (F)";
    }
    else {
        outputStringDP1 = "Input not a valid number.";
    }
    outputDP1.innerHTML = outputStringDP1;
}
function btnCClick() {
    let outputNumDP2;
    let outputStringDP2;
    let tempC;
    let tempRH2;
    
    if (isFloatInRange(inputC.value, -273.15, 1000000000) && isFloatInRange(inputRH2.value, 0, 100))
    {
        tempC = parseFloat(inputC.value);
        tempRH2 = parseFloat(inputRH2.value);
    }
    if (!isNaN(tempC) && (!isNaN(tempRH2))) {
        outputNumDP2 = tempC - ((100 - tempRH2) / 5);
        outputStringDP2 = "The dew point given these values is " + outputNumDP2.toFixed(2) + " (C)";
    }
    else {
        outputStringDP2 = "Input not a valid number.";
    }
    outputDP2.innerHTML = outputStringDP2;
}
function selCommonOnChangeF() {
    let selCommonF = document.getElementById("selCommonF")
        inputF.value = selCommonF.value.toString();
}
function selCommonOnChangeC() {
    let selCommonC = document.getElementById("selCommonC")
        inputC.value = selCommonC.value.toString();
}