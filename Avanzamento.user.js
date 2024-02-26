// ==UserScript==
// @name         Avanzamento
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  HiPlan Avanzamento
// @author       Menelao147
// @match        https://hiplan.sidel.com/HiPlan/HiPlan/avanzamento.phtml*
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Avanzamento.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Avanzamento.user.js
// ==/UserScript==

window.addEventListener('load', function() {
    window.resizeTo(900, 900);
    var i;

    let DataAv = document.getElementsByName('Dadatlav')
    let MaxDay = new Date().getDaysInMonth();
    let DropOre = document.getElementsByName('numore');
    let DropMin = document.getElementsByName('nummin');
    var Data = GM_getValue("DataAvanzamento").split("/");

    for (i = 0; i < DropOre[0].childElementCount;) {
        if (DropOre[0].children[i].value < 15) {
            i++;
            if (DropOre[0].children[i].value == 8) {
                DropOre[0].children[i].selected = true
            };
        }
        else {
            DropOre[0].removeChild(DropOre[0].children[i]);
        }
    }

    for (i = 0; i < DropMin[0].childElementCount;) {
        if (DropMin[0].children[i].value == 0) {
            i++;
        }
         else if (DropMin[0].children[i].value == 30) {
            i++;
        }
        else {
            DropMin[0].removeChild(DropMin[0].children[i]);
        }
    }

    if (parseInt(Data[0]) < MaxDay) {
        Data[0] = parseInt(Data[0]) + 1
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    } else {
        Data[0] = parseInt(Data[0])
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    }
}, false);

window.addEventListener('input', function saveDate() {
    let DataAv = document.getElementsByName('Dadatlav')
    var Data = DataAv[0].value.split("/");
    if (Data[0].length > 1 && Data.length == 3) {
        GM_setValue("DataAvanzamento", DataAv[0].value);
    }
    else if (parseInt(Data[0]) < 10 && Data.length == 3) {
        GM_setValue("DataAvanzamento", "0" + Data[0] + "/" + Data[1] + "/" + Data[2]);
    }
}, false);
