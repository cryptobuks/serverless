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
    ExpressionAttributeNames: {
      '#timePut': 'timePutIn'
    },
    ExpressionAttributeValues: {
      ':timeThing': timestampI
    }
  }
  var deleteItem = []
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      return
    }
    if (result.Count === 0) {
      console.error('empty')
      return
    }
    // create a response
    for (let i = 0; i < result.Items.length; i++) {
      deleteItem.push(result.Items[i].id)
    }
    let itemsArray = []
    for (let i = 0; i < deleteItem.length; i++) {
      let item1 = {
        DeleteRequest: {
          Key: {
            id: deleteItem[i]
          }
        }
      }
      // console.log(item1)
      itemsArray.push(item1)
    }
    // console.log(itemsArray)
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
  })
}
