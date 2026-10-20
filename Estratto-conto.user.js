// ==UserScript==
// @name         Estratto conto
// @namespace    http://tampermonkey.net/
// @version      0.10
// @description  HiPlan Estratto conto
// @author       Menelao147
// @match        */HiPlan/HiPlan/OreFatte.phtml*
// @icon         https://hiplan.sidel.com/HiPlan/favicon.ico
// @grant        none
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// ==/UserScript==

(function() {
    let frame = document.querySelector('iframe[src="OreFatte.phtml"]');
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
    if (Month <= 10) {
        LastMonthSt = "0" + (Month - 1).toString() + "/";
       }
    else {
        LastMonthSt = (Month - 1).toString() + "/";
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

    const btn = document.createElement('button');
    btn.textContent = 'Controlla';

    btn.style.position = 'fixed';
    btn.style.bottom = '20px';
    btn.style.right = '20px';
    btn.style.zIndex = '9999';
    btn.style.padding = '10px 18px';
    btn.style.background = '#007bff';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

    btn.addEventListener('click', function () {
        if (typeof window.Controlla === 'function') {
            Controlla();
        }
    });

    document.body.appendChild(btn);
})();
