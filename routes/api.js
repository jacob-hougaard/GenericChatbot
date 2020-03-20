const express = require('express');
const router = express.Router();
const AssistantController = require('../controllers/AssistantController');
const AssistantV2Controller = require('../controllers/AssistantV2Controller');


//const controller = new ApiController();
const assistantV1Controller = new AssistantController();
const assistantV2Controller = new AssistantV2Controller();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Asks multiple workspaces for an answer
router.post('/question/v1/multiple', async (req,res,next) => {
  assistantV1Controller.postGetLoadbalancerAnswer(req,res);
});

// Asks V1 Assistant for answer. Returns payload
router.post('/question/v1/', async (req,res,next) => {
  assistantV1Controller.postGetAnswer(req,res);
});

// Asks AssistantV2 for answer. returns payload
router.post('/question/v2', async (req,res,next) => {
  assistantV2Controller.postGetAnswer(req,res);
});

module.exports = router;
