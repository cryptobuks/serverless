'use strict'

const AWS = require('aws-sdk')// eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const params = {
  TableName: process.env.DYNAMODB_TABLE
}

module.exports.run = (event, context) => {
  // const time = new Date().getTime()
  console.log(`Your cron function "${context.functionName}"`)
}

var getAll = () => {
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      return
    }
    // create a response
    const response = {
      body: JSON.stringify(result.Items),
    };
    return response
  })
}
