const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const rateLimit = require("express-rate-limit");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./openapi.yml');

require("dotenv").config();

const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later."
});

app.use(limiter);


app.use(bodyParser.json({ limit: '10kb' })); 
app.use(helmet());
app.use(morgan("common"));
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use((req, res, next) => {

  if (req.body) {
    sanitizeInput(req.body);
  }
  

  if (req.query) {
    sanitizeInput(req.query);
  }
  
  if (req.params) {
    sanitizeInput(req.params);
  }
  
  next();
});


function sanitizeInput(data) {
  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (typeof data[key] === 'string') {
      
        data[key] = data[key].replace(/'/g, "''")
                             .replace(/--/g, '')
                             .replace(/;/g, '');
      } else if (typeof data[key] === 'object') {
        sanitizeInput(data[key]);
      }
    }
  }
}

app.use(xssClean());
app.use(mongoSanitize());

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/task-management", taskRoutes);
app.use("/auth", authRoutes);


module.exports = app;