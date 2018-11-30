'use strict'

const AWS = require('aws-sdk')// eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.run = (event, context, callback) => {
  // fetch all todos from the database
  // let results
  const timestampI = (Date.now() - 300000)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: '#timePut < :timeThing',
    // KeyConditionExpression: 'timePutIn < :timeThing',
    // IndexName: 'mainGSI',
    // ExpressionAttributeValues: {
    //   ':timeThing': timestampI
    // }
    ExpressionAttributeNames: {
      '#timePut': 'timePutIn'
    },
    ExpressionAttributeValues: {
      ':timeThing': timestampI
    }
  }
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      return
    }
    // create a response
    // deleteItem = result.Items
    // results = result.Items
    console.log(timestampI)
    console.log(result)
  })
  let itemsArray = []
  let delIds = []
  let item1 = {
    DeleteRequest: {
      Key: {
        id: 'second'
      }
    }
  }

  itemsArray.push(item1)

  const params1 = {
    RequestItems: {
      'serverless-rest-api-with-dynamodb-dev': itemsArray
    }
  }

  dynamoDb.batchWrite(params1, function (err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data)
    }
  })
}
