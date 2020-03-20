/*
This Watson assistant version works with version 5. It is included to leverage the implementation of workspace_id's in
calls to message, which at the time of writing is not yet included in the V2 API.
 */
const config = require('../config/config');
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
class AssistantV1Service {
  constructor(){
    this.assistant = new AssistantV1({
      authenticator: new IamAuthenticator({
        apikey:config.assistant.apikey,
      }),
      url:config.assistant.url,
      version: '2018-02-16'
    });
  }

  async sendMessage(payload, workspace_id){
    console.log(workspace_id);
    try{
      let response = await this.assistant.message(
          {
            input: { text: payload},
            workspaceId: workspace_id
          }
      );
      return response;
    }
    catch (e) {
      return({
        status:500,
        msg:'could not get answer from assistant'+e
      })
    }

  }
}

module.exports = AssistantV1Service;

