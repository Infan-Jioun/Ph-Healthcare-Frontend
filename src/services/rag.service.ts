import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
    query: string;
    limit?: string;
    sourceType?: string
}
export interface IRagSource {
    id: string;
    content: string;
    similarity: number;
    metadata?: {
        name?: string;
        [key: string]: unknown;
    }
    sourceType?: string;

}
export interface IRagQueryData {
    answer: any;
    souces: IRagSource[];
    contextUsed: string
}
export interface IIngestDoctorData {
    success: boolean;
    message: string;
    indexedCount: number
}
export const queryRagService = async (payload: IRagQueryPayload) => {
    const response = await httpClient.post("/rag/query", payload);
    return response;
}
export const ingestDoctorService = async () => {
    const response = await httpClient.post("/rag/ingest-doctor", {});
    return response;
}