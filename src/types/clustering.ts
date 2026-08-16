export interface ClusterRequest {
  text: string;
}

export interface ClusteredDocument {
  _id: string;
  document: string;
  true_category: string | null;
  cluster: number;
  predicted_category: string;
  confidence: number;
}

export interface AccuracyResponse {
  status: string;
  accuracy: number;
  assessment: string;
}

export interface ClusterResponse {
  status: string;
  message: string;
  data: ClusteredDocument;
}

export interface ResetClusterResponse {
  status: string;
  message: string;
  deleted_count: number;
  inserted_count: number;
}

export interface GetDocsResponse {
  status: string;
  total_documents: number;
  data: ClusteredDocument[];
}
