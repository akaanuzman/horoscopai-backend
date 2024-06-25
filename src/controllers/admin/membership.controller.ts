import { StatusCodes } from "../../enums/status.codes";
import { Request, Response } from "express";
import Membership from "../../models/membership.model";
import { ErrorConstants } from "../../constants/error.constants";

const addMembership = async (req: Request, res: Response) => {
    const name = req.body.name;
    if (name === undefined || name === "" || name === null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: ErrorConstants.membership.emptyMembershipName });
    }

    const membership = await Membership.create({ name });

    return res
        .status(StatusCodes.CREATED)
        .json({ membership });
}

const deleteMembership = async (req: Request, res: Response) => {
    const { membershipId } = req.body;
    if (membershipId === undefined || membershipId === "" || membershipId === null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: ErrorConstants.membership.emptyMembershipId });
    }

    const membership = await Membership.findByIdAndDelete(membershipId);

    if (!membership) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.membership.membershipNotFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "Membership deleted successfully" });


}

const getMemberships = async (req: Request, res: Response) => {

    const memberships = await Membership.find();

    if (!memberships) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.membership.noMembershipsFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ memberships });
}

export { addMembership, deleteMembership, getMemberships };