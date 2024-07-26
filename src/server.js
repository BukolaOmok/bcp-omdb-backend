import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
import pg from "pg";

//You should delete all of these route handlers and replace them according to your own requirements
const dbURL = process.env.DATABASE_URL;

const client = new pg.Client({
    connectionString: dbURL,
    ssl: true,
});

client.connect();

app.get("/movies/search", async (req, res) => {
    try {
        let searchTermValue = req.query.searchTerm;
        const dbResult = await query(
            "select * from movies where name like $1 limit 10",
            [`%${searchTermValue}%`]
        );
        res.json(dbResult.rows);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.post("/movies/:movie_id/comments", async (req, res) => {
    try {
        const movieID = parseInt(req.params.movie_id);
        const commentBody = req.body;

        const dbResult = await query(
            "INSERT INTO comments (movie_id, author, comment_text) VALUES ($1, $2, $3) RETURNING *",
            [movieID, commentBody.author, commentBody.comment_text]
        );
        res.json(dbResult.rows);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
