import { app } from "./server";
import logger from "./console/logger";
import https from "https";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const { LOCAL_URL, LOCAL_PORT, SECRET, SERVICE_CRT, SERVICE_KEY } = process.env;

(async () => {
    try {
        if (!LOCAL_URL || !LOCAL_PORT) {
            throw new Error("Missing environment variables");
        }
        https
            .createServer(
                {
                    rejectUnauthorized: true,
                    cert: fs.readFileSync(`./certificates/${SERVICE_CRT}`),
                    key: fs.readFileSync(`./certificates/${SERVICE_KEY}`),
                    requestCert: true,
                    passphrase: SECRET,
                },
                app
            )
            .listen(LOCAL_PORT, () => logger.info(`Server running on port: ${LOCAL_PORT}`));
    } catch (error) {
        logger.error(error);
    }
})();
