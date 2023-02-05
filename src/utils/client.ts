import axios from "axios";
import { BASE_URL } from "$utils/constants";

const client = axios.create({ timeout: 5000, baseURL: BASE_URL });

export enum ResponseCode {
    Success = "SUCCESS",
    Error = "ERROR"
}

export interface ResponseStructure<Data> {
    data: Data;
    version: string;
    error: string;
    errorCode: string;
    code: ResponseCode.Success | ResponseCode.Error;
}

const getDefaultErrorResponse = <Data>(): ResponseStructure<Data> => {
    return {
        data: {} as Data,
        version: "",
        error: "Uh oh! Something unexpected happened!",
        errorCode: "AXIOS_ERROR",
        code: ResponseCode.Error,
    }
}

export interface TargetWordResponse {
    targetWord: string,
    vesrion: number
}

export const GetTargetWord = async (): Promise<ResponseStructure<TargetWordResponse>> => {
    const data = await client
        .get<ResponseStructure<TargetWordResponse>>("/get-target-word")
        .then((resp) => resp.data)
        .catch(() => {
            return getDefaultErrorResponse<TargetWordResponse>();
        })
    return data;
}
