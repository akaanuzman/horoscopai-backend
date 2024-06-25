
/** 
 * @description This file contains the error constants for the application.
 * @constant ErrorConstants
 * @type {Object}
 * @property {Object} general - This is the general error for catch blocks.
 * @property {Object} auth - This is the error constants for the authentication.
 * 
 */
export const ErrorConstants = {
    /** @description This is the general error for catch blocks */
    general: { error: "An error occurred. Please try again later." },

    /** @description This is the error constants for the authentication. */
    auth: {
        /** @value Please provide an email and password */
        emptyEmailAndPassword: "Please provide an email and password",
        /** @value Please provide an email */
        emptyEmail: "Please provide an email",
        /** @value Please provide a password */
        emptyPassword: "Invalid e-mail or password.\nPlease check password and try again.",
        /** @value Invalid e-mail or password */
        invalidEmailOrPassword: "Invalid e-mail or password.\nPlease check password and try again.",
        /** @value This user have not token */
        haveNotToken: "You don't have a token",
        /** @value This user have not valid token */
        haveNotValidTokenOrExpire: "Please provide a valid token or token has expired",
        /** @value There is no company with that email */
        dontFindCompanyWithThatEmail: "There is no company with that email",
        /** @value There is no user with that email */
        dontFindUserWithThatEmail: "There is no user with that email",
    },

    /** @description This is the error constants for the user */
    user: {
        /** @value Please provide a user ID */
        emptyUserId: "Please provide a user ID",
        /** @value User not found */
        userNotFound: "User not found",
        /** @value User does not have an image */
        userDoesNotHaveAnImage: "User does not have an image",
        /** @value An error occurred while deleting user image */
        errorDeletingUserImage: "An error occurred while deleting user image",
    },

    /** @description This is the error constants for the images */
    image: {
        /** @value Please provide an image URL */
        emptyImage: "Please provide an image URL",
        /** @value Please provide images URL */
        emptyImages: "Please provide images URL",
        /** @value Please provide an image */
        emptyImageFile: "Please provide an image",
        /** @value An error occurred while uploading image */
        errorUploadingImage: "An error occurred while uploading image",
        /** @value An error occurred while deleting image */
        errorDeletingImage: "An error occurred while deleting image",
        /** @value Unsupported file format. Please provide a PNG, JPEG, or JPG image */
        unsupportedFileFormat: "Unsupported file format. Please provide a PNG, JPEG, or JPG image",
    },

    /** @description This is the error constants for the roles */
    role: {
        /** @value Please provide a role name */
        emptyRoleName: "Please provide a role name",
        /** @value Please provide a role ID */
        emptyRoleId: "Please provide a role ID",
        /** @value Role not found */
        roleNotFound: "Role not found",
        /** @value No roles found */
        noRolesFound: "No roles found"
    },

    /** @description This is the error constants for the membership */
    membership: {
        /** Please provide a membership name */
        emptyMembershipName: "Please provide a membership name",
        /** Please provide a membership ID */
        emptyMembershipId: "Please provide a membership ID",
        /** Membership not found */
        membershipNotFound: "Membership not found",
        /** No memberships found */
        noMembershipsFound: "No memberships found"
    },

    /** @description This is the error constants for the horoscope */
    horoscope: {
        /** Please provide a horoscope name */
        emptyHoroscopeName: "Please provide a horoscope name",
        /** Please provide a started date range */
        emptyStartedDateRange: "Please provide a started date range",
        /** Please provide an ended date range */
        emptyEndedDateRange: "Please provide an ended date range",
        /** Please provide a horoscope ID */
        emptyHoroscopeId: "Please provide a horoscope ID",
        /** Horoscope not found */
        horoscopeNotFound: "Horoscope not found",
        /** No horoscopes found */
        noHoroscopesFound: "No horoscopes found"
    },
}