import { StatusCodes } from "../../enums/status.codes";
import { Request, Response } from "express";
import Role from "../../models/role.model";
import { ErrorConstants } from "../../constants/error.constants";

const addRole = async (req: Request, res: Response) => {
    const name = req.body.name;
    if (name === undefined || name === "" || name === null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: ErrorConstants.role.emptyRoleName });
    }

    const role = await Role.create({ name });

    return res
        .status(StatusCodes.CREATED)
        .json({ role });
}

const deleteRole = async (req: Request, res: Response) => {
    const { roleId } = req.body;
    if (roleId === undefined || roleId === "" || roleId === null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: ErrorConstants.role.emptyRoleId });
    }

    const role = await Role.findByIdAndDelete(roleId);

    if (!role) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.role.roleNotFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "Role deleted successfully" });

}

const getRoles = async (req: Request, res: Response) => {
    const roles = await Role.find();

    if (!roles) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.role.noRolesFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ roles });
}

export { addRole, deleteRole, getRoles };