import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

class EnvVariables {
    @IsNotEmpty()
    @IsNumber()
    APP_PORT: number;

    @IsNotEmpty()
    @IsString()
    APP_PREFIX: string;

    @IsNotEmpty()
    @IsString()
    MONGO_URI: string;

    @IsNotEmpty()
    @IsString()
    NODE_ENV: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}