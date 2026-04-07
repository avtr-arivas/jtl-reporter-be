import { Request, Response } from "express"
import { db } from "../../../../db/db"
import { upsertChartAnalysis } from "../../../queries/chart-analysis"
import { StatusCode } from "../../../utils/status-code"

export const upsertChartAnalysisController = async (req: Request, res: Response) => {
    const { itemId, chartType } = req.params
    const { analysis } = req.body
    const result = await db.one(upsertChartAnalysis(itemId, chartType, analysis))
    res.status(StatusCode.Ok).json(result)
}
