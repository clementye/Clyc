"use strict";
const generer_situation = function (Femme) {
    let html;

    html = "";

		html +=`Wow vous avez debloqué une fin`
        html += `<img src="images/interrogation.jpg">`;
        html += Femme.fin_debloquees;
        html += `<br>`;
    
    return html;
};
module.exports = generer_situation;


