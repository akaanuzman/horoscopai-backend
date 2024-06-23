/**
 * @description This file contains all the route constants used in the application.
 * @constant RouteConstants
 * @type {Object}
 * @property {String} ALL_ROUTES - This is the route for *.
 * @property {Object} UPLOADS - This is the route for the uploads.
 * @property {Object} AUTH - This is the route for the authentication.
 * @property {Object} COMPANY - This is the route for the company.
 * @property {Object} ADMIN - This is the route for the admin.
 */
export const RouteConstants = {
    /** This 404 route is a '*' */
    ALL_ROUTES: "*",

    /** This is the route for the uploads */
    UPLOADS: {
        /** @value  /uploads/ */
        GENERAL: "/uploads/",
        /** @value  uploads/ */
        INTERNAL: "uploads/",
    },
};