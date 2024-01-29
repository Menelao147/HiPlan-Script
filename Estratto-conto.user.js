// ==UserScript==
// @name         Estratto conto
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  HiPlan Estratto conto
// @author       You
// @match        https://hiplan.sidel.com/HiPlan/HiPlan/OreFatte.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// @downloadURL  https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// @updateURL    https://github.com/Menelao147/HiPlan-Script/raw/main/Estratto-conto.user.js
// ==/UserScript==

(function() {
    'use strict';

    let DataInizio = document.getElementsByName('DaData');
    let DataFine = document.getElementsByName('AData');
    let MaxDay = new Date().getDaysInMonth();
    let Month = new Date().getMonth() + 1;
    let MonthSt = "";

    if (Month < 10) {
         MonthSt = "0" + Month.toString() + "/";
        }
    else {
        MonthSt = Month.toString() + "/";
    }
    let Year = new Date().getFullYear();
    let YearSt = Year.toString()

    DataInizio[0];
    DataInizio[0].setAttribute('value', "01/" + MonthSt + YearSt);
    DataFine[0].setAttribute('value', MaxDay + "/" + MonthSt + YearSt);
})();
