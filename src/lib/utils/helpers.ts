import type { ApprovalProcess } from "$lib/models/approval-process";
import { getNetworkLiteral, type TenantNetworkResponse } from "$lib/models/network";

export const abbreviateAddress = (address: string, size = 6) => {
  return `${address.slice(0, size)}...${address.slice(-size)}`;
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isSameNetwork = (a: string | TenantNetworkResponse, b: string | TenantNetworkResponse) => {
  return getNetworkLiteral(a) === getNetworkLiteral(b);
}

export const isDeploymentEnvironment = (approvalProcess: ApprovalProcess) => {
  return approvalProcess.component?.includes('deploy');
}
