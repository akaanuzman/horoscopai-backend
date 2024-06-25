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

    /** This is the route for the authentication */
    AUTH: {
        /** @value /auth */
        BASE: "/auth",

        /** @value /login @general /auth/admin */
        ADMIN: {
            /** @value /auth/admin */
            BASE: "/admin",
            /** @value /auth/admin/login @general /auth/admin/login */
            LOGIN: "/login",
            /** @value /auth/admin/register @general /auth/admin/register */
            REGISTER: "/register",
        },

        /** @value /login @general /auth/user */
        USER: {
            /** @value /auth/user */
            BASE: "/user",
            /** @value /login @general /auth/user/login */
            LOGIN: "/login",
            /** @value /register @general /auth/user/register */
            REGISTER: "/register",
            /** @value /forgotPassword @general /auth/user/forgotPassword */
            FORGOT_PASSWORD: "/forgotPassword",
            /** @value /resetPassword @general /auth/user/resetPassword */
            RESET_PASSWORD: "/resetPassword",
            /** @value /tokenControl @general /auth/user/tokenControl */
            TOKEN_CONTROL: "/tokenControl",
        },
    },

    /** This is the route for the admin */
    ADMIN: {
        /** @value /admin */
        BASE: "/admin",

        /** 
         * This is the route for the roles
         * @value /login @general /admin/role */
        ROLE: {
            /** @value /admin/role */
            BASE: "/role",
            /** @value /addRole @general /admin/role/addRole */
            ADD_ROLE: "/addRole",
            /** @value /deleteRole @general /admin/role/deleteRole */
            DELETE_ROLE: "/deleteRole",
            /** @value /getRoles @general /admin/role/getRoles */
            GET_ROLES: "/getRoles",
        },

        /** 
         * This is the route for the memberships
         * @value /membership @general /admin/membership */
        MEMBERSHIP: {
            /** @value /admin/membership */
            BASE: "/membership",
            /** @value /addMembership @general /admin/membership/addMembership */
            ADD_MEMBERSHIP: "/addMembership",
            /** @value /deleteMembership @general /admin/membership/deleteMembership */
            DELETE_MEMBERSHIP: "/deleteMembership",
            /** @value /getMemberships @general /admin/membership/getMemberships */
            GET_MEMBERSHIPS: "/getMemberships",
        },
    },
};