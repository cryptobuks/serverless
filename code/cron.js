'use strict'

const AWS = require('aws-sdk')// eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient()
// const timestamp = new Date().getTime()
const params = {
  TableName: process.env.DYNAMODB_TABLE,
  KeyConditionExpression: ':hkey > :time',
  ExpressionAttributeNames: {
    ':hkey': 'timestamp'
  },
  ExpressionAttributeValues: {
    ':time': 1
  }

}

module.exports.run = (event, context, callback) => {
  // fetch all todos from the database
  dynamoDb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
    }
    // create a response
    console.log(result)
  })
}
