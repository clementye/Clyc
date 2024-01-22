"use strict"

//récupérer un objet permettant de créer un objet"serveur HTTP"
const http = require("http");
const fs = require("fs");

//sera appelée à l'arrivée de chaque requête
const traite_requete = function (req, res) {
    let image;

    image = Math.floor(Math.random()* 6) + 1;
    image = fs.readFileSync(image + ".png"); // Sans "utf-8"

    //envoi de la page a renvoyer au navigateur
    res.writeHead(200, { "Content-Type": "image/png" }); // Content-Type d'une image
    res.write(image);
    res.end();
};

//crée un serveur
let mon_serveur = http.createServer(traite_requete);

//démarre le serveur
mon_serveur.listen(5000);

