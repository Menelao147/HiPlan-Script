// ==UserScript==
// @name         Estratto conto
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  HiPlan Estratto conto
// @author       Menelao147
// @match        */HiPlan/HiPlan/OreFatte.phtml*
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// ==/UserScript==

(function() {
    let ResultTable = document.getElementById('main_table_id');
    let DataInizio = document.getElementsByName('DaData');
    let DataFine = document.getElementsByName('AData');
    let MaxDay = new Date().getDaysInMonth();
    let NewDayRange = "20";
    let Month = new Date().getMonth() + 1;
    let LastMonthSt ="";
    let MonthSt = "";

    if (Month < 10) {
         MonthSt = "0" + Month.toString() + "/";
        }
    else {
        MonthSt = Month.toString() + "/";
    }
     if (Month < 11) {
         LastMonthSt = "0" + (Month - 1).toString() + "/";
        }
    else {
        MonthSt = (Month - 1).toString() + "/";
    }
    let Year = new Date().getFullYear();
    let YearSt = Year.toString();

    DataInizio[0];
    DataInizio[0].setAttribute('value', NewDayRange + "/" + LastMonthSt + YearSt);
    DataFine[0].setAttribute('value', MaxDay + "/" + MonthSt + YearSt);

    if (ResultTable !== null) {
        let Table = ResultTable.querySelector("table")
        for (var i = 0, row; row = Table.rows[i]; i++) {
            if (row.className == "due") {
                let OreInserite = row.outerText.split(":")
                if (parseInt(OreInserite[0]) < 8) {
                    row.style.backgroundColor = "Red"
                }
            }
        }
    }
    else {
        if (document.body.textContent.includes('Nessun dato corrisponde ai criteri di ricerca')){
        }
        else if (document.body.textContent.includes('No data matches the search criteria')){
        }
        else {
            Controlla();
        };
    }
})();
