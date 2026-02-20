import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse.js";
import UserModel from "../model/user.model.js";

// Ce middleware c'est un peu le "vigile" de l'entrée. 
// Il vérifie si la personne qui fait la requête a bien son "badge" (le Token JWT).
const authMiddleware = async (req, res, next) => {
    try {
        // On va chercher le token dans les headers (en-têtes) de la requête
        const authHeader = req.headers.authorization;

        // Si y'a pas de header ou que ça commence pas par "Bearer", c'est mort
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return ApiResponse.unauthorized(res, "Oups, il manque le badge (token) !");
        }

        // On récupère le badge tout seul (on vire le mot "Bearer ")
        const token = authHeader.split(" ")[1];
        if (!token) {
            return ApiResponse.unauthorized(res, "Le badge n'est pas bon.");
        }

        // Là on vérifie si le badge est vrai et pas périmé
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_temp_key");

        // On cherche l'utilisateur en base de données avec l'ID qui était caché dans le badge
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return ApiResponse.unauthorized(res, "Utilisateur introuvable dans la base.");
        }

        // Trop cool, on a trouvé l'utilisateur ! On le met dans "req.user" 
        // comme ça les autres fonctions pourront savoir qui c'est.
        req.user = user;
        next(); // On laisse passer au niveau suivant (ex: voir le panier)
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return ApiResponse.unauthorized(res, "Ton badge a expiré, connecte-toi à nouveau !");
        }
        return ApiResponse.unauthorized(res, "Badge invalide, tente pas de tricher !");
    }
};

export default authMiddleware;
