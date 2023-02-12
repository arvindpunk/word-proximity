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
    code: ResponseCode.Success | ResponseCode.Error;
}

const getDefaultErrorResponse = <Data>(): ResponseStructure<Data> => {
    return {
        data: {} as Data,
        version: "",
        error: `Uh oh! Something unexpected happened!`,
        code: ResponseCode.Error,
    }
}

export interface ResponseTargetWord {
    targetWord: string
}

export const GetTargetWord = async (): Promise<ResponseStructure<ResponseTargetWord>> => {
    const data = await client
        .get<ResponseStructure<ResponseTargetWord>>("/v1/get-target-word")
        .then((resp) => resp.data)
        .catch((_: Error) => {
            return getDefaultErrorResponse<ResponseTargetWord>();
        })
    return data;
}
