import {
  ClusterRequest,
  ClusterResponse,
  ResetClusterResponse,
  GetDocsResponse,
} from "../../types/clustering";

const BASE_URL = "https://assignment-cu-publications-vse-api.onrender.com";
const LOCAL_BASE_URL = "http://localhost:8000";

export async function clusterText(data: ClusterRequest): Promise<ClusterResponse> {
  const response = await fetch(`${BASE_URL}/clustering/cluster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function resetCluster(): Promise<ResetClusterResponse> {
  const response = await fetch(`${BASE_URL}/clustering/reset_cluster`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getDocs(): Promise<GetDocsResponse> {
  const response = await fetch(`${BASE_URL}/clustering/get_docs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
