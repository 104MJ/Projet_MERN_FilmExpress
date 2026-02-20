import fetch from "node-fetch";

const AUTH_URL = "http://localhost:5000/api/auth";
const CART_URL = "http://localhost:5000/api/cart";
const USERS_URL = "http://localhost:5000/api/users"; // To check old route is gone

async function testCart() {
    // 1. Login to get Token
    console.log("🔹 1. Connexion pour récupérer le Token...");
    const uniqueEmail = `cart_test_${Date.now()}@example.com`;

    // Register first to ensure user exists
    await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom: "Cart", prenom: "Tester", email: uniqueEmail, password: "password123",
            adresse: { rue: "Cart Lane", ville: "ShopCité", codePostal: "99000" }
        }),
    });

    const loginRes = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: uniqueEmail, password: "password123" }),
    });

    const loginData = await loginRes.json();
    const token = loginData.data?.token;

    if (!token) {
        console.error("❌ Echec Login (Pas de token)");
        return;
    }
    console.log("✅ Token récupéré.");

    // 2. Access Cart WITHOUT Token (Should Fail)
    console.log("\n🔹 2. Test accès Panier SANS token (Doit échouer 401)...");
    const failRes = await fetch(CART_URL, { method: "GET" });
    if (failRes.status === 401) {
        console.log("✅ Accès refusé comme prévu (401).");
    } else {
        console.error(`❌ Echec: Code ${failRes.status} au lieu de 401`);
    }

    // 3. Access Cart WITH Token (Should Succeed)
    console.log("\n🔹 3. Test accès Panier AVEC token...");
    const successRes = await fetch(CART_URL, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (successRes.status === 200) {
        const data = await successRes.json();
        console.log("✅ Accès Panier OK.");
        // console.log(data);
    } else {
        console.error(`❌ Echec: Code ${successRes.status}`);
    }

    // 4. Test Old Route is gone (Optional check)
    // The old route was users/:id/cart - we removed it from user router.
    // Verify it returns 404.
    // ... Actually express might treat it as :id route for UserController?
    // user_router.get("/:id", UserController.getUserById);
    // So /api/users/123/cart might be interpreted as getUserById("123") if logic allows... 
    // No, because "cart" is extra path. 
    // Wait, if I do GET /api/users/123/cart, it will match /:id ? No, /:id expects no trailing slash/path.
    // So it should be 404 unless another route matches.

    console.log("\n✅ Fin des tests Panier.");
}

testCart();
