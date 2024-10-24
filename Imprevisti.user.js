// ==UserScript==
// @name         Imprevisti
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  HiPlan Imprevisti
// @author       Menelao147
// @match        */HiPlan/HiPlan/Imprevisti/Imprevisti.phtml*
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        none
// @require      https://github.com/Menelao147/HiPlan-Script/raw/main/moment.js
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Imprevisti.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Imprevisti.user.js
// ==/UserScript==

(function() {
    var i

    let DataInputDa = document.getElementsByName('Dadatlav');
    let DataInputA = document.getElementsByName('Adatlav');
    let ImprevistiList = document.getElementsByName('idriga');
    let ImprevistiOre = document.getElementsByName('numore');
    let ImprevistiMinuti = document.getElementsByName('nummin');

    for (i = 0; i < ImprevistiList[0].childElementCount;) {
        if (ImprevistiList[0].children[i].text == "Assenza") {
            i++;
        }
        else if (ImprevistiList[0].children[i].text == "Assenza/Days Off") {
            i++;
        }
        else if (ImprevistiList[0].children[i].text == "Seleziona") {
            i++;
        }
        else if (ImprevistiList[0].children[i].text.includes("123")) {
            i++;
        }
        else if (ImprevistiList[0].children[i].text.includes("FLFIELD")) {
            i++;
        }
        else if (ImprevistiList[0].children[i].text.includes("FLSERVICE")) {
            i++;
        }
        else if (ImprevistiList[0].children[i].text.includes("COLLAUDO")) {
            i++;
        }
        else {
            ImprevistiList[0].removeChild(ImprevistiList[0].children[i]);
        }
    }

    for (i = 0; i < ImprevistiOre[0].childElementCount;) {
        if (Number(ImprevistiOre[0].children[i].text) < 15) {
            i++;
        }
        else {
            ImprevistiOre[0].removeChild(ImprevistiOre[0].children[i]);
        }
    }

    for (i = 0; i < ImprevistiMinuti[0].childElementCount;) {
        if (Number(ImprevistiMinuti[0].children[i].text) == 0) {
            i++;
        }
        else if (Number(ImprevistiMinuti[0].children[i].text) == 30) {
            i++;
        }
        else {
            ImprevistiMinuti[0].removeChild(ImprevistiMinuti[0].children[i]);
        }
    }
})
();

window.addEventListener('input', function copiaData() {
    var i
    let DataInputDa = document.getElementsByName('Dadatlav');
    let DataInputA = document.getElementsByName('Adatlav');

    if (event.target.name == 'Dadatlav') {
        if (moment(DataInputDa[0].value, "DD/MM/YYYY", true).isValid()) {
            DataInputA[0].value = DataInputDa[0].value;
        }
    }
}, false);
