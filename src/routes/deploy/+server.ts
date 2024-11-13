import { deployContract } from "$lib/defender";
import type { Credentials } from "$lib/models/auth";
import type { DeployContractRequest } from "$lib/models/deploy";
import { attempt } from "$lib/utils";
import { json } from '@sveltejs/kit';


export async function POST({ request }: { request: Request }) {
  const { deployment, credentials }: { credentials: Credentials, deployment: DeployContractRequest } = await request.json();

  // Creates a Relayer
  const [deploymentResult, error] = await attempt(() => deployContract(credentials, deployment));
  if (error) {
    return json({ success: false, error: error.msg });
  }

  return json({ success: true, data: { deployment: deploymentResult } });
}