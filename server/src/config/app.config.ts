export const appConfig = () => ({
    port: parseInt(process.env.APP_PORT, 10) || 9000,
});