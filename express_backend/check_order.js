import fetch from "node-fetch";

const AUTH_URL = "http://localhost:5000/api/auth";
const CART_URL = "http://localhost:5000/api/cart";
const ORDER_URL = "http://localhost:5000/api/orders";
const MOVIE_URL = "http://localhost:5000/api/movies";

async function testOrder() {
    // 1. Login
    console.log("🔹 1. Connexion...");
    const uniqueEmail = `order_test_${Date.now()}@example.com`;

    await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom: "Order", prenom: "Tester", email: uniqueEmail, password: "password123",
            adresse: { rue: "Order St", ville: "ShopCité", codePostal: "99000" }
        }),
    });

    const loginRes = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: uniqueEmail, password: "password123" }),
    });

    const token = (await loginRes.json()).data.token;
    const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
    console.log("✅ Connecté.");

    // 2. Get a Movie ID
    console.log("🔹 2. Récupération d'un film...");
    const movieRes = await fetch(MOVIE_URL);
    const movieData = await movieRes.json();
    const movies = movieData.data; // Assuming structure. check UserController/MovieController

    if (!movies || movies.length === 0) {
        // If no movies, Create one
        console.log("⚠️ Aucun film trouvé, création d'un film test...");
        const createMovieRes = await fetch(MOVIE_URL, {
            method: "POST",
            // headers: headers, // If protected? No, checking MovieController... usually protected? 
            // Checking task: we didn't check MovieController auth. It might be public or protected.
            // Let's try.
            headers: headers,
            body: JSON.stringify({
                titre: "Film Test", realisateur: "Moi", annee: 2024, genre: "Test", description: "Desc", prix: 10
            })
        });
        // If it fails, we might be stuck. But let's assume seed data exists or we can create.
        if (!createMovieRes.ok) console.log("⚠️ Echec création film", await createMovieRes.text());
        // Try getting again
    }

    // Re-fetch to be sure
    const movieRes2 = await fetch(MOVIE_URL);
    const movies2 = (await movieRes2.json()).data;

    if (!movies2 || movies2.length === 0) {
        console.error("❌ Impossible de trouver un film pour le test.");
        return;
    }

    const movieId = movies2[0]._id;
    console.log(`✅ Film trouvé: ${movies2[0].titre} (${movieId})`);

    // 3. Add to Cart
    console.log("🔹 3. Ajout au panier...");
    const addCartRes = await fetch(`${CART_URL}/add`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ movieId })
    });
    console.log("Add Status:", addCartRes.status);

    // 4. Create Order
    console.log("🔹 4. Création de la commande...");
    const orderRes = await fetch(ORDER_URL, {
        method: "POST",
        headers: headers
    });

    const orderData = await orderRes.json();
    console.log("Order Status:", orderRes.status);
    //   console.log("Order Response:", orderData);

    if (orderRes.status === 201) {
        console.log("✅ Commande créée avec succès !");
    } else {
        console.error("❌ Echec création commande.");
    }

    // 5. Verify Cart Empty
    console.log("🔹 5. Vérification Panier vide...");
    const cartRes = await fetch(CART_URL, { headers });
    const cartData = await cartRes.json();
    if (cartData.data && cartData.data.movies.length === 0) {
        console.log("✅ Panier vide.");
    } else {
        console.error("❌ Panier non vide après commande.");
    }
}

testOrder();
