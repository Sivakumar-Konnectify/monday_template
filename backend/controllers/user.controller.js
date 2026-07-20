import axios from "axios";
import {handleError, billings} from "../utils/user.utils.js"

const rootDomain = ".konnectifyapp.co";
const path = "/ipaas/api";
const orgId = 27;
const projectId = 27;


export const register = async(req, res) => {
    try {
        const {domain, email, password, name, website, accountId, appId} = req.body;
        const payload = {
            domain,
            email,
            password,
            name,
            website,
            orgId,
            projectId
        };
        const url = `https://${domain}${path}/auth/register/service`;
        const registerResponse = await axios.post(url, payload);
        const registeredDomain = registerResponse.data.domain
        const ipaasBaseUrl = `https://${registeredDomain}`
        const tenantId = registerResponse.data.user.id;
        const accessToken = registerResponse.data.accessToken;
        const accountName = "";
        await billings(appId, accountId, tenantId, email, password, ipaasBaseUrl, accountName)
        res.status(201).json({accessToken:accessToken});
    } catch (error) {
        console.log("Error in registering user", error);
        const err = handleError(error, "Failed to register user");
        res.status(err.status).json({message: err.message});
    }
}

export const login = async(req,res) => {
    try {
        const {email, password, domain} = req.body;
        if(!domain){
            res.status(500).json({message:"Domain not found"});
        }
        const url = `https://${domain}${rootDomain}${path}/auth/login/service`;
        const payload = {
            email,
            password,
            orgId
        };
        const loginResponse = await axios.post(url, payload);
        res.status(200).json({accessToken: loginResponse.data.accessToken});
    } catch (error) {
        console.log("Failed to login", error);
        const err = handleError(error, "Failed to login");
        res.status(err.status).json({message: err.message});
    }
}

export const logout = async(req,res) => {
    try {
        const { domain, token} = req.body;
        if(!domain){
            res.status(500).json({message:"Domain not found"});
        }
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const url = `https://${domain}${rootDomain}${path}/auth/logout`;
        const logoutResponse = await axios.post(url, {}, {headers});
        res.status(200).json({mesasge: logoutResponse.data.message});
    } catch (error) {
        console.log("Failed to logout", error);
        const err = handleError(error, "Failed to logout");
        res.status(err.status).json({message: err.message});
    }
}

export const billingPlans = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const url = `https://${domain}${rootDomain}${path}/billing/plans`;
        const billingPlanResponse = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json({data:billingPlanResponse.data});
    } catch (error) {
        console.log("Error in fetching billing plans", error);
        const err = handleError(error, "Failed to fetch billing plan");
        res.status(err.status).json({message: err.message});
    }
}

export const billingCredits = async(req, res) => {
    try {
        const {domain, token} = req.body;
        const url = `https://${domain}${rootDomain}${path}/billing/credits`;
        const billingCreditsResponse = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json(billingCreditsResponse.data);
    } catch (error) {
        console.log("Error in fetching billing credits", error);
        const err = handleError(error, "Failed to fetch billing credits");
        res.status(err.status).json({message: err.message});
    }
}

export const getBootstrapToken = async(req,res) => {
    try {
        const {email, password, domain} = req.body;
        if(!domain){
            res.status(500).json({message:"Domain not found"});
        }
        const url = `https://${domain}${rootDomain}${path}/auth/bootstrap-token`;
        const payload = {
            email,
            password
        };
        const bootstrapTokenResponse = await axios.post(url, payload);
        res.status(200).json({token: bootstrapTokenResponse.data.token});
    } catch (error) {
        console.log("Failed to get bootstrap token", error);
        const err = handleError(error, "Failed to get bootstrap token");
        res.status(err.status).json({message: err.message});
    }
}

export const getSession = async(req,res) => {
    try {
        const {domain, token} = req.body;
        if(!domain){
            res.status(500).json({message:"Domain not found"});
        }
        const url = `https://${domain}${rootDomain}${path}/sessions/me`;

        const sessionResponse = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        res.status(200).json({data: sessionResponse.data});
    } catch (error) {
        console.log("Failed to get session", error);
        const err = handleError(error, "Failed to get session");
        res.status(err.status).json({message: err.message});
    }
}

export const getOAuthUrl = async(req,res) => {
    try {
        const {token, authUrl, connectionName, id=""} = req.body;
        const headers = {
            Authorization: `Bearer ${token}`
        }
        let body;
    if(id){
      body = {
        connectionName: connectionName,
        connectionId: id
      }
    } else {
      body = {
        connectionName: connectionName
      }
    }
        const oauthUrlResponse = await axios.post(authUrl, body, {headers:headers});
        res.status(200).json({data: oauthUrlResponse.data});
    } catch (error) {
        console.log("Failed to get OAuth url", error);
        const err = handleError(error, "Failed to get OAuth url");
        res.status(err.status).json({message: err.message});
    }
}





