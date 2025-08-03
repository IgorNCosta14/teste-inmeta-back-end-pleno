import { AppDataSource } from "./dataSource";

export async function initializeDatabase() {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            await AppDataSource.initialize();
            console.log("Database connected");
            return;
        } catch (error) {
            console.error(`Failed to connect. Retrying in 3s... [${retries + 1}/${maxRetries}]`);

            console.error("Error detail:", JSON.stringify(error, null, 2));
            if (error instanceof Error && error.stack) {
                console.error("Stack trace:", error.stack);
            }

            retries++;
            await new Promise((res) => setTimeout(res, 3000));
        }
    }

    throw new Error("Could not connect to the database after multiple attempts.");
}