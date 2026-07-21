import { KonnectifyClient } from "./konnectifyClient";
import { storageService } from "./storageService";
import type {Workflow } from "../types";

export class WorkflowService {
  constructor(private storage = storageService) {}

  async list(client: KonnectifyClient): Promise<Workflow[]> {
    try {
      const workflows = await client.listWorkflows();
      return workflows;
    } catch (error) {
      client.handleError("listWorkflows", error);
    }
  }

  async activate(client: KonnectifyClient, workflowId: string): Promise<void> {
    try {
      await client.activateWorkflow(workflowId);
      await this.list(client);
    } catch (error) {
      client.handleError("activateWorkflow", error);
    }
  }

  async deactivate(client: KonnectifyClient, workflowId: string): Promise<void> {
    try {
      await client.deactivateWorkflow(workflowId);
      await this.list(client);
    } catch (error) {
      client.handleError("deactivateWorkflow", error);
    }
  }

}

export const workflowService = new WorkflowService();
