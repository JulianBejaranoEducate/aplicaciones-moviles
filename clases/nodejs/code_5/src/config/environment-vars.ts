import joi from "joi";
import "dotenv/config";

export type ReturnEnvironmentVars = {
    PORT: number;
}

type ValidationEnviromentVars = {
    error: joi.ValidationError | undefined,
    value: ReturnEnvironmentVars
}