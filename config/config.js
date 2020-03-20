const dotenv = require('dotenv');

dotenv.config();

const config = {
  assistant:{
    apikey:process.env.ASSISTANT_KEY,
    assistantId:process.env.ASSISTANT_ID,
    url:process.env.ASSISTANT_URL,
    workspaces:[
      {id:"66b9dc91-dc71-40b7-85d2-07f38cf6ff76", name: "info"},
      {id:"4ea8d959-8af8-4fa2-aff3-0f002ad4c09e", name: "workshop"}
    ],
  }
};

module.exports = config;
