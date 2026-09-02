import joi from "joi"; //validación
import "dotenv/config"; //maneh¿jar las variables de entorno desde el process

export type ReturnEnvironmentVars = {
    PORT: number;
}
export type ValidationEnvironmentVars = {
    error: joi.ValidationError | undefined; //si joi no me da ninguno doy undefined
    value: ReturnEnvironmentVars
}

function validateEnvVars(vars: NodeJS.ProcessEnv):ValidationEnvironmentVars{
    const envSchema = joi.object({
        PORT: joi.number().required()
    }).unknown(true); //para que no me tire error si hay otras variables de entorno

    const {error, value} = envSchema.validate(vars);
    return {error,value}
}

const loadEnvVars = () : ReturnEnvironmentVars => {
    //validar datos
    const result = validateEnvVars(process.env);
    if (result.error) {
        throw new Error (result.error.message);
    }
    const value = result.value;

    return{
        PORT: value.PORT,
    }
}

const envs = loadEnvVars();
export default envs;