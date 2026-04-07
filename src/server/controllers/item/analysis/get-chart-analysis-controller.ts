import { Request, Response } from "express"
import { db } from "../../../../db/db"
import { getChartAnalysis } from "../../../queries/chart-analysis"
import { StatusCode } from "../../../utils/status-code"

export const getChartAnalysisController = async (req: Request, res: Response) => {
    const { itemId, chartType } = req.params
    const result = await db.oneOrNone(getChartAnalysis(itemId, chartType))
    if (!result) {
        return res.status(StatusCode.Ok).json({ analysis: null, generated: false })
    }
    res.status(StatusCode.Ok).json(result)
}
