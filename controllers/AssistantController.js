const Assistant = require('../service/AssistantV1Service');
const config = require('../config/config');
class AssistantController {
  constructor() {
    this.assistant = new Assistant();
    this.workspaces = config.assistant.workspaces;
  }

  async postGetAnswer(req, res, next) {
    try{
      let answer = await this.assistant.sendMessage(req.body.msg, this.workspaces[0].id);

      res.send({
        status:200,
        msg:answer.result.output
      })
    }
    catch(e){
      res.send({
        status:500,
        msg:'could not get answer from assistant'
      })
    }
  }

  async postGetLoadbalancerAnswer(req, res){
    console.log(req.body.msg);
    try{
      let answer = await this.sendMessageToMultipleWorkspaces(req.body.msg);
      console.log(answer);
      res.send(answer);
    }
    catch (e) {
      console.log("ERROR",e);
      res.send();
    }
  }

  // This function is made to get the highest confidence from multiple workspaces.
  async sendMessageToMultipleWorkspaces(payload){
    let highestConfidence = [];
    try{
      for(let w of this.workspaces){
        console.log(w);
        let answer = await this.assistant.sendMessage(payload, w.id);
        console.log(answer);
        if(answer.result.intents.length > 0 && answer.result.intents[0].confidence){
          highestConfidence.push(answer.result);
        }
      }
      if(highestConfidence.length > 0){
        highestConfidence.sort(() => {
          return a.intents[0].confidence > b.intents[0].confidence
        });
        return highestConfidence;
      }
      else{
        return []
      }
    }
    catch (e) {
      console.log("Error while sending message to multiple workspaces, ", e);
    }

  }
}

module.exports = AssistantController;