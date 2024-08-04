import { catchAsync } from "../utils/catchAsync.js";
import * as entryService from "../services/entry.service.js";
import { ErrorJSON } from "../utils/error.js";

// using chunks upload for large entries
// you must set `'Transfer-Encoding': 'chunked'` header on the client to use this feature.
// so the browser can automatically chunk the body
const createEntry = catchAsync(async (req, res) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
    });
    let statistics;
    req.on('end', async () => {
        if (!data) throw new ErrorJSON(500, "No body found!")
        statistics = await entryService.getEntrySummury(data, req.user.sub);
        return res.send({
            message: "Data received successfully",
            statistics: statistics,
        });
    });
});


const getAllUserEntry = catchAsync(async (req, res) => {
    const ent = await entryService.getAllUserEntries(req.user.sub)
    return res.json({ent});
});

const getEntryById = catchAsync(async (req, res) => {
    const ent = await entryService.getEntry(req.params.id)
    return res.json({ent});
});



export {
    createEntry,
    getAllUserEntry,
    getEntryById,
}
