const AssistantV2 = require('ibm-watson/assistant/v2');
const config = require('../config/config');
const { IamAuthenticator } = require('ibm-watson/auth');

class AssistantV2Service{
    constructor(){
      console.log(config);
        this.session = null;
         this.assistant = new AssistantV2({
            version: '2019-02-28',
            authenticator: new IamAuthenticator({
              apikey: config.assistant.apikey
            }),
            url: 'https://gateway-lon.watsonplatform.net/assistant/api'
        });
         this.createSession();
    }

    // Create a V2 session
    createSession(){
        this.assistant.createSession({
            assistantId: config.assistant.assistantId
        })
            .then(res => {
                console.log(JSON.stringify(res, null, 2));
                this.session = res.result.session_id;
            })
            .catch(err => {
                console.log(err);
            });
    }

    async sendMessage(question){
      try{
        let message = await this.assistant.message({
          assistantId:config.assistant.assistantId,
          sessionId: this.session,
          input: {
            'message_type': 'text',
            'text': question
          }
        })
        return(message);
      }
      catch (e) {
        console.log("Error while creating session ",err);
        return(e);
      }
    }
}

module.exports = AssistantV2Service;