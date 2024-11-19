import type { CreateApprovalProcessRequest } from "./models/approval-process";
import type { Credentials } from "./models/auth";
import type { DeployContractRequest, UpdateDeploymentRequest } from "./models/deploy";

class ApiClient {
  credentials: Credentials | null = null;

  async authenticate(credentials: Credentials) {
    const response = await fetch("/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();

    if (result.success) {
      // stores the credentials in current session.
      this.credentials = credentials;
    }

    return result;
  }

  async createApprovalProcess(approvalProcess: CreateApprovalProcessRequest) {
    const response = await fetch("/approval-process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credentials: this.credentials,
        approvalProcess,
      }),
    });

    return response.json();
  }

  async createDeployment(deployment: DeployContractRequest) {
    const response = await fetch("/deploy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credentials: this.credentials,
        deployment,
      }),
    });

    return response.json();
  }

  async updateDeployment(deployment: UpdateDeploymentRequest) {
    const response = await fetch("/deploy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credentials: this.credentials,
        deployment,
      }),
    });

    return response.json();
  }
}

export const API = new ApiClient();