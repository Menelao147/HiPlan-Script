// ==UserScript==
// @name         Avanzamento
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  HiPlan Avanzamento
// @author       Menelao147
// @match        */HiPlan/HiPlan/*vanzamento.phtml*
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://github.com/Menelao147/HiPlan-Script/raw/main/GM_config.js
// @require      https://github.com/Menelao147/HiPlan-Script/raw/main/moment.js
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Avanzamento.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Avanzamento.user.js
// ==/UserScript==

window.addEventListener('load', function() {
    window.resizeTo(900, 900);
    window.moveTo(GM_getValue("WindowsPosX"), GM_getValue("WindowsPosY"));
    let i;

    let DataInputDa = document.getElementsByName('Dadatlav');
    let DataInputA = document.getElementsByName('Adatlav');
    let DropOre = document.getElementsByName('numore');
    let DropMin = document.getElementsByName('nummin');
    let Data = GM_getValue("DataAvanzamento", Date()).split("/");
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
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    } else if (GiornoSettimana == 5 && (parseInt(Data[0]) + 3) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 3
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    } else if (GiornoSettimana == 6 && (parseInt(Data[0]) + 2) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 2
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    } else if ((parseInt(Data[0]) + 1) <= MaxDay){
        Data[0] = parseInt(Data[0]) + 1
        if (parseInt(Data[0]) < 10){
            Data[0] = "0" + Data[0]
        }
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    } else if (MeseSalvato != MeseAttuale && (parseInt(Data[1]) + 1) <= 11) {
        Data[0] = "01"
        Data[1] = parseInt(Data[1]) + 1
        if (parseInt(Data[1]) < 10){
            Data[1] = "0" + Data[1]
        }
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    } else {
        Data[0] = parseInt(Data[0])
        DataInputDa[0].value = Data[0] + "/" + Data[1] + "/" + Data[2];
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    }
}, false);

window.addEventListener('input', function saveDate() {
    let DataInputDa = document.getElementsByName('Dadatlav')
    let DataInputA = document.getElementsByName('Adatlav');
    let Data = DataInputDa[0].value.split("/");
    if (Data[0].length > 1 && Data.length == 3) {
        GM_setValue("DataAvanzamento", DataInputDa[0].value);
    }
    else if (parseInt(Data[0]) < 10 && Data.length == 3) {
        GM_setValue("DataAvanzamento", "0" + Data[0] + "/" + Data[1] + "/" + Data[2]);
    }
    if (event.target.name == 'Dadatlav') {
        if (moment(DataInputDa[0].value, "DD/MM/YYYY", true).isValid()) {
            DataInputA[0].value = DataInputDa[0].value;
        }
    }
}, false);

window.addEventListener('beforeunload', () => {
  GM_setValue("WindowsPosX", window.screenX);
  GM_setValue("WindowsPosY", window.screenY);
});
