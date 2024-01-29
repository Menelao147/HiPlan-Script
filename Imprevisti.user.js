// ==UserScript==
// @name         Imprevisti
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  HiPlan Imprevisti
// @author       Menelao147
// @match        https://hiplan.sidel.com/HiPlan/HiPlan/Imprevisti/Imprevisti.phtml
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Imprevisti.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Imprevisti.user.js
// ==/UserScript==

(function() {
    'use strict';
    var i

    let DataInput = document.getElementsByName('Dadatalav');
    let ImprevistiList = document.getElementsByName('idriga');
    let ImprevistiOre = document.getElementsByName('numore');
    let ImprevistiMinuti = document.getElementsByName('nummin');

    for (i = 0; i < ImprevistiList[0].childElementCount;) {
        if (ImprevistiList[0].children[i].text == "Assenza") {
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
        else {
            ImprevistiList[0].removeChild(ImprevistiList[0].children[i]);
        }
    }

    for (i = 0; i < ImprevistiOre[0].childElementCount;) {
        if (Number(ImprevistiOre[0].children[i].text) < 14) {
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
