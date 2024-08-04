import Statistics from "../modals/statistics.modal.js";
import { ErrorJSON } from "../utils/error.js";

const createStatistic = async (body) => {
    try {
        const statistic = await Statistics.create(body);
        return statistic;
    } catch (error) {
        throw new ErrorJSON(500, error);
    }
}

const geteStatistic = async (uuid) => {
    try {
        const statistic = await Statistics.findOne(uuid);
        if (statistic) throw new ErrorJSON(404, `No statistic found with uuid ${uuid}!`);
        return statistic;
    } catch (error) {
        throw new ErrorJSON(500, error);
    }
}

export {
    createStatistic,
    geteStatistic
}