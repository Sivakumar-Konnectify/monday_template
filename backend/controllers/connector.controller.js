import axios from "axios";
import {handleError} from "../utils/user.utils.js"

const rootDomain = ".konnectifyapp.co";
const path = "/ipaas/api";



export const installConnectorFromTemplate = async(req, res) => {
    try {
        const {domain, token, templateId} = req.body;
        const url = `https://${domain}${rootDomain}${path}/template-folders/${templateId}/install`;
        const installConnectorResponse = await axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const installedConnectors = installConnectorResponse.data?.konnectorResults?.map(data => ({
            connectorId: data.konnectorId,
            connectorName: data.templateName
        }));
        const data = {
            message:"Template installed",
            connectorFolderId: installConnectorResponse.data.konnectorFolderId,
            connectors: installedConnectors
        }
        res.status(201).json(data);
    } catch (error) {
        console.log("Error in installing connector from template", error);
        const err = handleError(error, "Error in installing connector from template");
        res.status(err.status).json({message:err.message});
    }
}

export const getConnectors = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const {pageSize, pageNumber} = req.query;
        const url = `https://${domain}${rootDomain}${path}/konnectors?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        const getConnectorsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(201).json({data: getConnectorsResponse.data.data, meta: getConnectorsResponse.data.meta});
    } catch (error) {
        console.log("Error in fetching connectors", error);
        const err = handleError(error, "Error in fetching connectors");
        res.status(err.status).json({message:err.message});
    }
}

export const getConnections = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const {pageSize, pageNumber} = req.query;
        const url = `https://${domain}${rootDomain}${path}/connections?pageSize=${pageSize}&pageNumber=${pageNumber}`;
        const getConnectionsResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(201).json({data: getConnectionsResponse.data?.data, meta: getConnectionsResponse.data.meta});
    } catch (error) {
        console.log("Error in fetching connections", error);
        const err = handleError(error, "Error in fetching connections");
        res.status(err.status).json({message:err.message});
    }
}

export const activateConnector = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const {connectorId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/konnectors/${connectorId}/ACTIVE`;
        const getConnectorsResponse = await axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json({message: "Connector activated"});
    } catch (error) {
        console.log("Error in activating connectors", error);
        const err = handleError(error, "Error in activating connectors");
        res.status(err.status).json({message:err.message});
    }
}

export const deactivateConnector = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const {connectorId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/konnectors/${connectorId}/INACTIVE`;
        const getConnectorsResponse = await axios.post(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json({message: "Connector activated"});
    } catch (error) {
        console.log("Error in activating connectors", error);
        const err = handleError(error, "Error in activating connectors");
        res.status(err.status).json({message:err.message});
    }
}

export const createConnection = async(req, res) => {
    try {
        const {domain, token, appId, name, data} = req.body;
        const url = `https://${domain}${rootDomain}${path}/connections`;
        const headers = {
            headers: {Authorization: `Bearer ${token}`}
        };
        const payload = {
            appId,
            name,
            data
        };
        const createConnectionResponse = await axios.post(url, payload, headers);
        console.log("cerate connection", createConnectionResponse.data);
        res.status(201).json({data: createConnectionResponse.data});
    } catch (error) {
        console.log("Error in connection creation", error);
        const err = handleError(error, "Error in connection creation");
        res.status(err.status).json({message:err.message});
    }
}

export const updateConnection = async(req, res) => {
    try {
        const {domain, token, appId, name, data} = req.body;
        const {connectionId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/connections/${connectionId}`;
        const updateConnectionResponse = await axios.put(url,
        {
            appId,
            name,
            data
        },
        {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("update connection", updateConnectionResponse.data);
        res.status(200).json({data: updateConnectionResponse.data});
    } catch (error) {
        console.log("Error in connection update", error);
        const err = handleError(error, "Error in connection update");
        res.status(err.status).json({message:err.message});
    }
}

export const editConnection = async(req, res) => {
    try {
        const {domain, token, appId, name, data} = req.body;
        const {connectionId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/connections/${connectionId}`;
        const editConnectionResponse = await axios.patch(url,
        {
            appId,
            name,
            data
        },
        {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("edit connection", editConnectionResponse.data);
        res.status(200).json({data: editConnectionResponse.data});
    } catch (error) {
        console.log("Error in edit connection", error);
        const err = handleError(error, "Error in edit connection");
        res.status(err.status).json({message:err.message});
    }
}

export const deleteConnection = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const {connectionId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/connections/${connectionId}`;
        const deleteConnectionResponse = await axios.delete(url, {
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log("delete connection", deleteConnectionResponse.data);
        res.status(200).json({data: deleteConnectionResponse.data});
    } catch (error) {
        console.log("Error in connection deletion", error);
        const err = handleError(error, "Error in connection deletion");
        res.status(err.status).json({message:err.message});
    }
}

export const getOAuthAuthUrl = async(req, res) => {
    try {
        const {domain, token, connectionName} = req.body;
        const {appId} = req.params;
        const url = `https://${domain}${rootDomain}${path}/oauth/${appId}/auth-url`;
        const authUrlResponse = await axios.post(url,
        {
            connectionName: connectionName,
            data: {}
        },
        {
            headers: {Authorization: `Bearer ${token}`}
        });
        res.status(200).json({data: authUrlResponse.data});
    } catch (error) {
        console.log("Error in fetching auth url", error);
        const err = handleError(error, "Error in fetching auth url");
        res.status(err.status).json({message:err.message});
    }
}

