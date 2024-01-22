// Traitement de "req_jouer"

"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");
const monObjet = require("./jeu.js");


const trait1 = function (req, res, query) {
    let page;
	let contenu;
	let situation;
	let marqueurs;
	let temps = 61;

	contenu = fs.readFileSync("situation.json", "utf-8");
	situation = JSON.parse(contenu);

//compte à rebours

	setInterval(() =>{
		temps--;
	},1000);	
	
//les marqueurs

    marqueurs = {};
    marqueurs["temps"] = temps;
	marqueurs.texte = monObjet.generer_texte (situation, 0);
    marqueurs.buttons = monObjet.generer_button(situation[0].choix, 0, query.pseudo);
    marqueurs.pseudo = query.pseudo;
	marqueurs.id = situation[0].image;

	// AFFICHAGE DE LA PAGE D'ACCUEIL 2 I-E le Jeu code en Html Css et Js

    page = fs.readFileSync("jeuIndex.html", 'utf-8');
    page = nunjucks.renderString(page, marqueurs);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait1;
                         
