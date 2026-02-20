import fetch from "node-fetch";

const BASE_URL = "http://localhost:5000/api/auth";

async function testAuth() {
    console.log("🔹 Test: Enregistrement d'un nouvel utilisateur");
    const uniqueEmail = `test_${Date.now()}@example.com`;

    const registerRes = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom: "Test",
            prenom: "User",
            email: uniqueEmail,
            password: "password123",
            adresse: { rue: "123 Rue Test", ville: "Paris", codePostal: "75000" }
        }),
    });

    const registerData = await registerRes.json();
    console.log("Status:", registerRes.status);
    console.log("Response:", registerData);

    if (registerRes.status === 201) {
        console.log("✅ Inscription OK");
    } else {
        console.error("❌ Erreur Inscription");
        return;
    }

    console.log("\n🔹 Test: Connexion");
    const loginRes = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: uniqueEmail,
            password: "password123"
        }),
    });

    const loginData = await loginRes.json();
    console.log("Status:", loginRes.status);
    // console.log("Response:", loginData);

    if (loginRes.status === 200 && loginData.data.token) {
        console.log("✅ Connexion OK - Token reçu :", loginData.data.token.substring(0, 20) + "...");
    } else {
        console.error("❌ Erreur Connexion");
    }
}

testAuth();
