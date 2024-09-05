import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import FavoritesDAO from './dao/favoriteDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB Server
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error)

// We export here for the benefit of testing
export default app;