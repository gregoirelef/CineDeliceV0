import "dotenv/config";
import express from "express";
import { router } from "./src/router.js";
import { xss } from "express-xss-sanitizer";
import cors from "cors";
import { errorHandler } from "./src/middlewares/errorHandlers.js";
import cookieParser from "cookie-parser";
import { swaggerUi, swaggerSpec } from "./docs/swagger/swagger.js";

const app = express(); // On crée une instance d'Express

app.use(cookieParser()); // Le middleware pour parser les cookies

app.use(express.json()); // Middleware pour parser le corps des requêtes JSON

app.use(
  cors({
    // On définit certains noms de domaines qu'on veut autoriser (certaines origines de notre appel)
    origin: (origin, callback) => {
      // Autoriser toutes les origines "localhost" ou "127.0.0.1", peu importe le port
      if (!origin || /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/.test(origin) || origin === process.env.FRONT_URL) {
        callback(null, true); // Autoriser l'origine
      } else {
        callback(new Error("Not allowed by CORS")); // Bloquer l'origine
      }
    },
    credentials: true, //Pour permettre au cookies de communiquer entre le front et le back
    allowedHeaders: "Content-Type, Authorization, X-Requested-With", // Ajoute les headers autorisés
    // - 'Content-Type' : indique le type de données envoyées (ex: JSON)
    // - 'Authorization' : souvent utilisé pour envoyer un token d'authentification
    // - 'X-Requested-With' : indique que la requête vient d'AJAX/fetch,
    methods: "GET, POST, PUT, DELETE, PATCH", // Spécifie les méthodes autorisées
  })
);
// On définit le dossier public pour les fichiers statiques
app.use(express.static("public"));
// xss est un middleware qui permet de nettoyer les entrées de l'utilisateur pour éviter les attaques XSS
app.use(xss());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.use(router);
// Middleware gestion des erreurs
app.use(errorHandler);


app.listen(process.env.PORT, () => {  // On écoute sur le port défini dans le fichier .env
  console.log(`Listening on ${process.env.BASE_URL}:${process.env.PORT}`); // Affiche l'URL d'écoute
});
