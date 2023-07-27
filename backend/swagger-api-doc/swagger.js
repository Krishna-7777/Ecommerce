const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce',
            version: '1.0.0',
            description: 'APIs for an Ecommerce App',
        }
    },
    apis: [
        './swagger-api-doc/*.js',
    ]
};

module.exports={
    options
}