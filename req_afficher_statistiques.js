"use strict";
const fs = require("fs");
const nj = require("nunjucks");
const generer_situation = require("./generer_situation.js");
const statistiques  = function (req, res, query) {
    let contenu; // Contenu du fichier sous forme de chaîne de caractères
    let sauvegarde; // Contenu du fichier reconstruit en mémoire
    let html;
    let marqueurs;
    let page;

    /* == Récupération des champs de la query-string == */
    /* == Récupération du contexte ==  */
    contenu = fs.readFileSync(query.pseudo + ".json", "utf-8");
    sauvegarde = JSON.parse(contenu); 

    /* == Traitement == */
    /* == Fabrication et envoi de la réponse (page HTML) == */
    marqueurs = {};
	if (sauvegarde.fin_debloquees.indexOf("finA")!==-1) { 
			marqueurs.source ="images/photo1.jpg"
			marqueurs.texte_1 ="Bravo, vous êtes mort. Vos choix vous ont menés à une fin tragique, vos compagnons vous ont exécuté !"
	} else {
			marqueurs.source ="images/interrogation.jpg"	
			marqueurs.texte_1 ="fin non debloquées" 
	}
	if (sauvegarde.fin_debloquees.indexOf("finB")!==-1) { 
			marqueurs.source_1 ="images/photo1.jpg"
			marqueurs.texte_2 =" wow vous avez debloqué la deuxieme fin"

	} else {
		marqueurs.source_1 = "images/interrogation.jpg"
		marqueurs.texte_2 ="fin non debloquées"

	}
	if (sauvegarde.fin_debloquees.indexOf("finC")!==-1){
			marqueurs.source_2 ="images/photo1.jpg"
			 marqueurs.texte_3 =" wow vous avez debloqué la troisième fin"

	} else {
		marqueurs.source_2="images/interrogation.jpg"
		marqueurs.texte_3 ="fin non debloquée"
	}
	if (sauvegarde.fin_debloquees.indexOf("finD")!==-1){
    		marqueurs.source_3 ="images/photo1.jpg"
			marqueurs.texte_4 =" wow vous avez debloqué la quatrième fin"

    } else { 
		marqueurs.source_3="images/interrogation.jpg"
		marqueurs.texte_4 ="fin non debloquée"

	}
	if (sauvegarde.fin_debloquees.indexOf("finE")!==-1){
    	marqueurs.source_4 ="images/photo1.jpg"
		marqueurs.texte_5 ="wow vous avez debloqué la cinquième fin"

    } else  {
		marqueurs.source_4 ="images/interrogation.jpg"
		marqueurs.texte_5 ="fin non debloquée"

	}
	if (sauvegarde.fin_debloquees.indexOf("finF")!==-1){
   		 marqueurs.source_5 ="images/photo1.jpg"
		 marqueurs.texte_6 ="wow vous avez debloqué la sixième fin"

  	} else {
		marqueurs.source_5 = "images/interrogation.jpg"
		marqueurs.texte_6 ="fin non debloquée"

	} 
	marqueurs.pseudo = query.pseudo;
	//console.log(marqueurs.liste);
    page = fs.readFileSync("statistiques.html", "utf-8");
    page = nj.renderString(page, marqueurs);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(page);
    res.end();
};

module.exports = statistiques;



