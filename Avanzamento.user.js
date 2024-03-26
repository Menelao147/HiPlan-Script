// ==UserScript==
// @name         Avanzamento
// @namespace    http://tampermonkey.net/
// @version      0.8
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
    window.moveTo(GM_getValue("WindowsPosX"), GM_getValue("WindowsPosY"));
    let i;

    let DataAv = document.getElementsByName('Dadatlav')
    let DropOre = document.getElementsByName('numore');
    let DropMin = document.getElementsByName('nummin');
    let Data = GM_getValue("DataAvanzamento").split("/");
    let MeseAttuale = new Date().getMonth()
    let MaxDay = new Date(Data[2] + "/" + Data[1] + "/" + Data[0]).getDaysInMonth();
    let GiornoSettimana = new Date(Data[2] + "/" + Data[1] + "/" + Data[0]).getDay();
    let MeseSalvato = new Date(Data[2] + "/" + Data[1] + "/" + Data[0]).getMonth()

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

    if (GiornoSettimana == 0 && (parseInt(Data[0]) + 1) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 1
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    } else if (GiornoSettimana == 5 && (parseInt(Data[0]) + 3) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 3
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    } else if (GiornoSettimana == 6 && (parseInt(Data[0]) + 2) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 2
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    } else if ((parseInt(Data[0]) + 1) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 1
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataAv[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataAv[0].value);
    } else if (MeseSalvato != MeseAttuale && (parseInt(Data[1]) + 1) <= 11) {
        Data[0] = "01"
        Data[1] = parseInt(Data[1]) + 1
        if (parseInt(Data[1]) < 10){
            Data[1] = "0" + Data[1]
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
    let Data = DataAv[0].value.split("/");
    if (Data[0].length > 1 && Data.length == 3) {
        GM_setValue("DataAvanzamento", DataAv[0].value);
    }
    else if (parseInt(Data[0]) < 10 && Data.length == 3) {
        GM_setValue("DataAvanzamento", "0" + Data[0] + "/" + Data[1] + "/" + Data[2]);
    }
}, false);

window.addEventListener('beforeunload', () => {
  GM_setValue("WindowsPosX", window.screenX);
  GM_setValue("WindowsPosY", window.screenY);
});
