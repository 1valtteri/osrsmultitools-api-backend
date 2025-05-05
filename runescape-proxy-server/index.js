const express = require("express");
const axios = require("axios");
const cors = require("cors");

const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());

// fetch item data based on item id
app.get("/item/:id", async (req, res) => {
    const itemId = req.params.id;

    try {
        const response = await axios.get(
            `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemId}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching item data: ", error.message);
        res.status(500).json({error: "Failed to fetch item data"})
    }
});

// fetch player data based on username
app.get("/player/:username", async (req, res) => {
    const username = req.params.username;
    
    try {
        const response = await axios.get(
            `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${username}`
        );
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching player data: ", error.message);
        res.status(500).json({error: "Failed to fetch player data"})
    }
});

app.use(express.static(path.join(__dirname,"public")));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})


