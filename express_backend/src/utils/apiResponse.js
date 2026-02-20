// Petit outil pour envoyer des réponses toujours pareilles au frontend
class ApiResponse {
    // Quand ça marche
    static success(res, message, data = null, status = 200) {
        return res.status(status).json({
            success: true,
            message: message,
            data: data
        });
    }

    // Quand y'a un problème
    static error(res, message, error = null, status = 500) {
        console.error("Erreur API:", message, error);
        return res.status(status).json({
            success: false,
            message: message,
            error: error ? error.message : null
        });
    }
}

export default ApiResponse;
