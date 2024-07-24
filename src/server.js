import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
import pg from "pg"

//You should delete all of these route handlers and replace them according to your own requirements
const dbURL =process.env.DATABASE_URL;

const client = new pg.Client ({
    connectionString: dbURL,
    ssl: true,
});


client.connect();


app.get("/", (req, res) => {
    res.json({
        outcome: "success",
        message: "you have connected to the omdb database",
    });
});


// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
