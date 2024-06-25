
import express from "express";
import { RouteConstants } from "./src/constants/route.constants";
import { config } from "./src/config/config";
import router from "./src/routes";
import DatabaseHelper from "./src/helpers/database/database.helper";
import { notFoundMiddleware } from "./src/middlewares/404.middleware";

const app = express();

// Res body middleware
app.use(express.json());

// Serve static files from the internal uploads directory
//  at the specified route for uploaded images.
app.use(
    RouteConstants.UPLOADS.GENERAL,
    express.static(RouteConstants.UPLOADS.INTERNAL),
);

// Import all API routes
app.use(config.apiEndpointWithVersion, router);

// 404 Middleware for not found routes
app.get(RouteConstants.ALL_ROUTES, notFoundMiddleware);

// App is listening this method
app.listen(config.port, async () => {
    console.log(`The server was started on ${config.port} port.`);

    // Connect to the MongoDB
    await DatabaseHelper.connectToMongoDB();
});