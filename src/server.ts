import { app } from './app';
import { initializeDatabase } from './config/typeOrm';

const port = process.env.PORT || 3000;

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});