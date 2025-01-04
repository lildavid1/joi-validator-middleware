const Joi = require('joi')
const sendResponse = require('./libs/sendResponse')
const constants = require('./libs/constants/constants')
const response_message = require('./libs/constants/responseMessage')

const validate = (schema) => async (request, response, next) => {
  const action = { GET: 'params', POST: 'body', DELETE: 'body', PUT: 'body' }

  if (Object.keys(request.params).length === 0) {
    action.GET = 'query'
  }

  try {
    await schema[action[request.method]].validateAsync(
      {
        ...request[action[request.method]],
      },
      { abortEarly: false },
    )
    next()
  } catch (err) {
    const formattedErrors = err.details.map((error) => {
      return {
        field: error.context.key,
        message: error.message.replace(/['"]+/g, ''),
      }
    })

    return sendResponse.sendError(
      request,
      response,
      { data: formattedErrors, message: response_message.UNPROCESSABLE_CONTENT },
      constants.UNPROCESSABLE_ENTITY,
    )
  }
}

module.exports = validate
