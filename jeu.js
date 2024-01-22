"use strict";

let monObjet = {};

// permet d'afficher le texte général du JSON

monObjet.generer_texte = function (situation, id) {

	let html;

	//html += `< img src ="` +situation[id]+ `.png">`;
	html = situation[id].text;
	return html;
};

// permet d'afficher le texte des boutons du JSON et les indices aussi

monObjet.generer_button = function (choix, id, pseudo) {
    
	const fs = require("fs");

    let contenu_sauvegarde;
    let sauvegarde;
	let marqueur;
	let contenu_fichier;

    contenu_sauvegarde = fs.readFileSync(pseudo + ".json", 'utf-8');
    sauvegarde = JSON.parse(contenu_sauvegarde);

    marqueur = "";

    for (let j = 0; j < choix.length; j++) {

		if(
			choix[j].honneur == true 
			&& (
			sauvegarde.fin_debloquees.indexOf("finB") !== -1 
			|| sauvegarde.fin_debloquees.indexOf("finC") !== -1
			)
		) {
			contenu_fichier = choix[j].text + "🏆";

		}else if(choix[j].deshonneur == true
        && sauvegarde.fin_debloquees.indexOf("finA") !== -1 
        ){  
            contenu_fichier = choix[j].text + " 👎";
        }else{  
                contenu_fichier = choix[j].text;
        }
        // marqueur += `<br>`;
        // marqueur += `<br>`;
		marqueur += `<a href = "/req_choisir?rep=${j}&situation=${id}&pseudo=${pseudo}"> 
            <button>`+ contenu_fichier + `</button></a>`;
	}
    return marqueur;
};

module.exports = monObjet;


