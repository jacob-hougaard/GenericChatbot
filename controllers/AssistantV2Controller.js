const AssistantService = require('../service/AssistantV2Service');
const fs = require('fs');

class AssistantV2Controller {
    constructor() {
        this.assistant = new AssistantService();
    }

    async postGetAnswer(req, res, next) {

        try{
            let answer = await this.assistant.sendMessage(req.body.msg);

            console.log(`answer: ${JSON.stringify(answer)}`);
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
}

module.exports = AssistantV2Controller;