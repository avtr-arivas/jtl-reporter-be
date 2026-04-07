export const getChartAnalysis = (itemId: string, chartType: string) => {
    return {
        text: `SELECT analysis, generated, updated_at as "updatedAt"
               FROM jtl.chart_analysis
               WHERE item_id = $1 AND chart_type = $2`,
        values: [itemId, chartType],
    }
}

export const upsertChartAnalysis = (itemId: string, chartType: string, analysis: string) => {
    return {
        text: `INSERT INTO jtl.chart_analysis (item_id, chart_type, analysis, generated, updated_at)
               VALUES ($1, $2, $3, true, NOW())
               ON CONFLICT ON CONSTRAINT chart_analysis_item_id_chart_type_unique
               DO UPDATE SET analysis = $3, generated = true, updated_at = NOW()
               RETURNING analysis, generated, updated_at as "updatedAt"`,
        values: [itemId, chartType, analysis],
    }
}
