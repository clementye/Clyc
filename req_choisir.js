"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");
const monObjet = require("./jeu.js");

const traite = function (req, res, query) {
    
	let id;
	let contenu_fichier;
    let contenu_sauvegarde;
    let situation_courante;
    let situation_suivante;
    let sauvegarde;
    let marqueurs;
    let page;
	let situation;

	contenu_fichier = fs.readFileSync("situation.json", "utf-8");
	situation = JSON.parse(contenu_fichier);

    contenu_sauvegarde = fs.readFileSync(query.pseudo + ".json", "utf-8");
    sauvegarde = JSON.parse(contenu_sauvegarde);

    situation_courante = situation[query.situation];
    id = situation_courante.choix[query.rep].nextText;
    situation_suivante = situation[id];

	if  (
        situation_courante.debloque == "finA"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }
    else if  (
        situation_courante.debloque == "finB"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }
    else if  (
        situation_courante.debloque == "finC"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }
    else if  (
        situation_courante.debloque == "finD"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }
    else if  (
        situation_courante.debloque == "finE"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }
    else if  (
        situation_courante.debloque == "finF"
        && sauvegarde.fin_debloquees.indexOf(situation_suivante.debloque) === -1
        ) {
            sauvegarde.fin_debloquees.push(situation_courante.debloque);
        }

    contenu_sauvegarde = JSON.stringify(sauvegarde);
	fs.writeFileSync (query.pseudo + ".json", contenu_sauvegarde, 'utf-8');

	marqueurs = {};
	marqueurs.situation = query.situation;
	marqueurs.texte = monObjet.generer_texte (situation, id);
    marqueurs.buttons = monObjet.generer_button(situation[id].choix, id, query.pseudo);
    marqueurs.temps = 61;
	marqueurs.pseudo = query.pseudo;
	marqueurs.id = situation[id].image;
	page = fs.readFileSync("jeuIndex.html", 'utf-8');
    page = nunjucks.renderString(page, marqueurs);

 	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
}

module.exports = traite;

