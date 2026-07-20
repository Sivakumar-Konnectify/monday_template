import express from "express";
import { installConnectorFromTemplate, getConnectors, activateConnector, 
    deactivateConnector, getConnections, createConnection, editConnection, updateConnection,
    deleteConnection, getOAuthAuthUrl 
} from "../controllers/connector.controller.js";

const connectorRouter = express.Router();

connectorRouter.post('/template/install', installConnectorFromTemplate);
connectorRouter.post('/connectors', getConnectors);
connectorRouter.post('/connections', getConnections);
connectorRouter.post('/:connectorId/activate', activateConnector);
connectorRouter.post('/:connectorId/deactivate', deactivateConnector);
connectorRouter.post('/connection', createConnection);
connectorRouter.post('/connection/:connectionId/update', updateConnection);
connectorRouter.post('/connection/:connectionId/edit', editConnection);
connectorRouter.post('/connection/:connectionId/delete', deleteConnection);
connectorRouter.post('/oauth/:appId/auth-url', getOAuthAuthUrl);



export default connectorRouter