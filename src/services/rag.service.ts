import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
    query: string;
    limit?: string;
    sourceType?: string
}
export const queryRagService = async (payload: IRagQueryPayload) => {
    const response = await httpClient.post("/rag/query", payload);
    return response;
}
export const ingestDoctorService = async () => {
    const response = await httpClient.post("/rag/ingest-doctor", {});
    return response;
}