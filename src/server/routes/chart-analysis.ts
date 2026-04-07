import * as express from "express"
import { Request, Response } from "express"
import { wrapAsync } from "../errors/error-handler"
import { authenticationMiddleware } from "../middleware/authentication-middleware"
import { authorizationMiddleware, AllowedRoles } from "../middleware/authorization-middleware"
import { paramsSchemaValidator } from "../schema-validator/schema-validator-middleware"
import { paramsSchema } from "../schema-validator/item-schema"
import { projectExistsMiddleware } from "../middleware/project-exists-middleware"
import { getChartAnalysisController } from "../controllers/item/analysis/get-chart-analysis-controller"
import { upsertChartAnalysisController } from "../controllers/item/analysis/upsert-chart-analysis-controller"

export class ChartAnalysisRoutes {

    routes(app: express.Application): void {

        app.route("/api/projects/:projectName/scenarios/:scenarioName/items/:itemId/analysis/:chartType")
            .get(
                authenticationMiddleware,
                authorizationMiddleware([AllowedRoles.Readonly, AllowedRoles.Operator, AllowedRoles.Admin]),
                paramsSchemaValidator(paramsSchema),
                projectExistsMiddleware,
                wrapAsync((req: Request, res: Response) => getChartAnalysisController(req, res)))

            .put(
                authenticationMiddleware,
                authorizationMiddleware([AllowedRoles.Operator, AllowedRoles.Admin]),
                paramsSchemaValidator(paramsSchema),
                projectExistsMiddleware,
                wrapAsync((req: Request, res: Response) => upsertChartAnalysisController(req, res)))
    }
}
