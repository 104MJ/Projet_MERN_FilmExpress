import UserService from "../service/user.service.js";
import ApiResponse from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";

// Inscription et Connexion
class AuthController {

    // Nouveau compte
    static async register(req, res) {
        try {
            const { password, ...infos } = req.body;

            const dejaLa = await UserModel.findOne({ email: infos.email });
            if (dejaLa) {
                return ApiResponse.error(res, "Désolé, l'email existe déjà !", null, 400);
            }

            const salt = await bcrypt.genSalt(10);
            const mdpHache = await bcrypt.hash(password, salt);

            const nouveau = await UserService.createUser({
                ...infos,
                password: mdpHache,
            });

            nouveau.password = undefined;
            ApiResponse.success(res, "Bienvenue ! Tu es inscrit.", nouveau, 201);
        } catch (err) {
            ApiResponse.error(res, "Erreur pendant l'inscription", err);
        }
    }

    // Se connecter
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return ApiResponse.error(res, "N'oublie pas l'email et le mot de passe !", null, 400);
            }

            const utilisateur = await UserModel.findOne({ email }).select("+password");

            if (!utilisateur) {
                return ApiResponse.error(res, "Email ou mot de passe faux.", null, 401);
            }

            const motDePasseValide = await bcrypt.compare(password, utilisateur.password);
            if (!motDePasseValide) {
                return ApiResponse.error(res, "Email ou mot de passe faux.", null, 401);
            }

            const token = jwt.sign(
                { id: utilisateur._id, role: utilisateur.role },
                process.env.JWT_SECRET || "ma_super_cle_secrete_123",
                { expiresIn: "24h" }
            );

            utilisateur.password = undefined;
            ApiResponse.success(res, "Salut ! Connexion OK.", { user: utilisateur, token });
        } catch (err) {
            ApiResponse.error(res, "Gros bug de connexion", err);
        }
    }
}

export default AuthController;
