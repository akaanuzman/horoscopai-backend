import bcrypt from "bcryptjs"
import { ErrorConstants } from "../../constants/error.constants";

/**
 * @description This is an interface for the company login input.
 * @interface CompanyLoginInput
 * @property {String} email - This is the email of the company.
 * @property {String} password - This is the password of the company.
 */
interface CompanyLoginInput {
    email: string;
    password: string;
}

/**
 * @description This is a singleton helper class for input operations.
 * @class InputHelper
 * @method shared - This is a static method that returns the shared instance of the class.
 * @method validateCompanyLoginInput - This method is used to validate the company login input. 
 * @method comparePassword - This method is used to compare the password with the hash password.
 */
class InputHelper {
    private static instance: InputHelper | null = null;

    private constructor() { }

    static shared(): InputHelper {
        if (!InputHelper.instance) {
            InputHelper.instance = new InputHelper();
        }
        return InputHelper.instance;
    }

    /**
     * @description This method is used to validate the company login input.
     * @param req - This is the company login input.
     * @returns - This is the error message if the input is invalid.
     */
    validateCompanyLoginInput = (req: CompanyLoginInput): string | null => {
        const { email, password } = req;

        if (!email && !password) return ErrorConstants.auth.emptyEmailAndPassword;

        else if (!email) return ErrorConstants.auth.emptyEmail;

        else if (!password) return ErrorConstants.auth.emptyPassword;

        return null;
    }

    /**
     * @description This method is used to compare the password with the hash password.
     * @param pass - This is the password.
     * @param hashPass - This is the hash password.
     * @returns - This is the result of the comparison.
     */
    comparePassword = (pass: any, hashPass: any) => {
        return bcrypt.compareSync(pass, hashPass)
    }
}

export default InputHelper.shared();
