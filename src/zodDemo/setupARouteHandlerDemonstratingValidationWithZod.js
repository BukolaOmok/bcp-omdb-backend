import { albumSchema } from "./albumSchema.js";
//docs are at https://zod.dev/

export function setupARouteHandlerDemonstratingValidationWithZod(app) {
    app.post("/album", handlePOSTAlbumRequest);

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    function handlePOSTAlbumRequest(req, res) {
        const validationResult = albumSchema.safeParse(req.body);
        if (!validationResult.success) {
            res.status(400).json({
                outcome: "failure",
                error: validationResult.error,
            });
            return;
        }
        //typescript / vscode can use intellisense about the type of validationResult.data now
        //e.g. validationResult.data.artist
        res.json({
            outcome: "success",
            message:
                "Looks good!  I would save that album to database but this is just a demo.",
            validatedAlbum: validationResult.data,
        });
    }
}
