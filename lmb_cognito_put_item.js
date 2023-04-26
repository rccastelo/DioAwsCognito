var aws = require('aws-sdk');
var dyn = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    let respBody = "";
    let statusCode = 0;
    
    let { id, price } = JSON.parse(event.body);
    
    var params = {
      TableName : 'tbl_cognito_item',
      Item : {
          id : id,
          price : price
      }
    };
    
    try {
        await dyn.put(params).promise();
        
        statusCode = 200;
        respBody = JSON.stringify('Item incluido');
    } catch (ex) {
        statusCode = 400;
        respBody = JSON.stringify(ex);
    }
    
    var resp = {
        statusCode : statusCode,
        body : respBody
    };
    
    return resp;
};
