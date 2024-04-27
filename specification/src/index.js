const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const express = require('express');

// swagger documentation
const swaggerDocument = yaml.load('./spec/swagger.yaml');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Hello World from Express!!! 🚀');
});

const port = process.env.PORT || 5065;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
