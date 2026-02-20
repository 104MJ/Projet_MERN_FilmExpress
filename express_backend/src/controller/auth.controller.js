import UserService from "../service/user.service.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";

// Ici c'est le cerveau de la connexion et de l'inscription !
class AuthController {

    // Pour s'inscrire au club "Film Express"
    static async register(req, res) {
        try {
            const { password, ...userData } = req.body;

            // Vérifie si l'email existe déjà.
            const existingUser = await UserModel.findOne({ email: userData.email });
            if (existingUser) {
                return ApiResponse.badRequest(res, "Désolé, cet email est déjà pris !");
            }

            // Étape super importante : On ne stocke JAMAIS le mdp en clair.
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // On crée le nouvel utilisateur avec son mdp tout mélangé
            const newUser = await UserService.createUser({
                ...userData,
                password: hashedPassword,
            });

            // On cache le mdp mélangé dans la réponse pour faire propre
            newUser.password = undefined;

            ApiResponse.success(res, "Bienvenue parmi nous ! Inscription réussie.", newUser, 201);
        } catch (error) {
            ApiResponse.error(res, "Mince, l'inscription n'a pas marché...", error);
        }
    }

    // Pour se connecter et récupérer son badge (token)
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // On vérifie si tout est rempli
            if (!email || !password) {
                return ApiResponse.badRequest(res, "Hé, n'oublie pas ton email ou ton mot de passe !");
            }

            // On va chercher l'utilisateur en base. 
            // Comme on a mis "select: false" sur le mdp dans le modèle, 
            // il faut dire "select('+password')" pour le récupérer ici.
            const user = await UserModel.findOne({ email }).select("+password");

            if (!user) {
                return ApiResponse.unauthorized(res, "Petit problème d'identifiants... vérifie ton email !");
            }

            // On compare le mdp en clair qu'il nous donne avec celui mélangé en base
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return ApiResponse.unauthorized(res, "Mauvais mot de passe, réessaye !");
            }

            // Si c'est bon, on crée le fameux Token (le badge de 24h)
            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET || "secret_temp_key", // Faudrait changer ça en production ;)
                { expiresIn: "24h" }
            );

            // On cache le mdp avant de renvoyer l'utilisateur
            user.password = undefined;

            ApiResponse.success(res, "Content de te revoir ! Connexion réussie.", { user, token });
        } catch (error) {
            ApiResponse.error(res, "Erreur de connexion... bizarre.", error);
        }
    }
}

export default AuthController;
