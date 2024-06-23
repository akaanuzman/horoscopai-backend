"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_constants_1 = require("./src/constants/route.constants");
const config_1 = require("./src/config/config");
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
// Res body middleware
app.use(express_1.default.json());
// Serve static files from the internal uploads directory
//  at the specified route for uploaded images.
app.use(route_constants_1.RouteConstants.UPLOADS.GENERAL, express_1.default.static(route_constants_1.RouteConstants.UPLOADS.INTERNAL));
// Import all API routes
app.use(config_1.config.apiEndpointWithVersion, routes_1.default);
// App is listening this method
app.listen(config_1.config.port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`The server was started on ${config_1.config.port} port.`);
}));
