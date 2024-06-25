import { StatusCodes } from "../../enums/status.codes";
import { Request, Response } from "express";
import Horoscope from "../../models/horoscope.model";
import { ErrorConstants } from "../../constants/error.constants";

const addHoroscope = async (req: Request, res: Response) => {
    try {
        const { name, startedDateRange, endedDateRange } = req.body;

        const horoscope = await Horoscope.create({ name, startedDateRange, endedDateRange });

        return res
            .status(StatusCodes.CREATED)
            .json({ horoscope });
    } catch (error) {
        console.log(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error });
    }
}

const addHoroscopesScript = async (req: Request, res: Response) => {
    // Horoscope data
    const horoscopes = [
        { name: "Koç", start: "03-21", end: "04-19" },
        { name: "Boğa", start: "04-20", end: "05-20" },
        { name: "İkizler", start: "05-21", end: "06-20" },
        { name: "Yengeç", start: "06-21", end: "07-22" },
        { name: "Aslan", start: "07-23", end: "08-22" },
        { name: "Başak", start: "08-23", end: "09-22" },
        { name: "Terazi", start: "09-23", end: "10-22" },
        { name: "Akrep", start: "10-23", end: "11-21" },
        { name: "Yay", start: "11-22", end: "12-21" },
        { name: "Oğlak", start: "12-22", end: "01-19" },
        { name: "Kova", start: "01-20", end: "02-18" },
        { name: "Balık", start: "02-19", end: "03-20" }
    ];

    // Create horoscopes
    horoscopes.forEach(async horoscope => {
        await Horoscope.create({
            name: horoscope.name,
            startedDateRange: horoscope.start,
            endedDateRange: horoscope.end
        });
    });

    const addedHoroscopes = await Horoscope.find();

    return res
        .status(StatusCodes.CREATED)
        .json({ addedHoroscopes });
}

const deleteHoroscope = async (req: Request, res: Response) => {
    const { horoscopeId } = req.body;
    if (horoscopeId === undefined || horoscopeId === "" || horoscopeId === null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ error: ErrorConstants.horoscope.emptyHoroscopeId });
    }

    const horoscope = await Horoscope.findByIdAndDelete(horoscopeId);

    if (!horoscope) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.horoscope.horoscopeNotFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ message: "Horscope deleted successfully" });

}

const getHoroscopes = async (req: Request, res: Response) => {
    const horoscopes = await Horoscope.find();

    if (!horoscopes) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .json({ error: ErrorConstants.horoscope.noHoroscopesFound });
    }

    return res
        .status(StatusCodes.OK)
        .json({ horoscopes });
}

export {
    addHoroscope,
    addHoroscopesScript,
    deleteHoroscope,
    getHoroscopes
};