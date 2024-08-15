import { app } from "./support/setupExpress.js";
import { query } from "./support/db.js";
import { connect } from "amqplib";
import { getEnvironmentVariableOrFail } from "./support/environmentVariableHelp.js";

app.get("/movies/search", async (req, res) => {
    try {
        let searchTermValue = req.query.searchTerm;
        const dbResult = await query(
            "SELECT * FROM movies WHERE LOWER(name) LIKE LOWER($1) ORDER BY name LIMIT 10",
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
        const msgToSendToQueue = JSON.stringify(commentBody);
        channel.sendToQueue(queueName, Buffer.from(msgToSendToQueue));

        const dbResult = await query(
            "INSERT INTO comments (movie_id, author, comment_text) VALUES ($1, $2, $3) RETURNING *",
            [movieID, commentBody.author, commentBody.comment_text]
        );
        res.json(dbResult.rows);
    } catch (error) {
        console.error("Error inserting comment:", error);
        res.status(500).json({ error: error });
    }
});

app.get("/movies/:movie_id/comments", async (req, res) => {
    try {
        const movieID = parseInt(req.params.movie_id);

        const dbResult = await query(
            "SELECT * FROM comments WHERE movie_id = $1",
            [movieID]
        );
        res.json(dbResult.rows);
    } catch (error) {
        console.error(`Error getting comments for movie:`, error);
        res.status(500).json({ error: error });
    }
});

app.get("/comments", async (req, res) => {
    try {
        const dbResult = await query("SELECT * FROM comments");
        res.json(dbResult.rows);
    } catch (error) {
        console.error(`Error getting all comments`, error);
        res.status(500).json({ error: error });
    }
});

app.get("/comments/:comment_id", async (req, res) => {
    try {
        const commentID = req.params.comment_id;
        const dbResult = await query(
            "SELECT * FROM comments WHERE comment_id = $1",
            [commentID]
        );
        res.json(dbResult.rows);
    } catch (error) {
        console.error("Error getting comment by ID", error);
        res.status(500).json({ error: error });
    }
});

async function connectToMessageQueue() {
    const exchangeURL = getEnvironmentVariableOrFail("AMQP_EXCHANGE_URL");
    const conn = await connect(exchangeURL);

    const queueName = "OMDB-Post-Comment";
    const channel = await conn.createChannel();
    //will only create the queue if it doesn't already exist
    await channel.assertQueue(queueName, { durable: false });
    console.log("Connected to message server - OMDB-Post-Comment");
    return { channel, queueName };
}

const { channel, queueName } = await connectToMessageQueue();

// use the environment variable PORT, or 4000 as a fallback
const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(
        `Your express app started listening on ${PORT}, at ${new Date()}`
    );
});
