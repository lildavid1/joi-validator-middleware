const Joi = require("joi")
const sendResponse = require("./libs/sendResponse")
const constants = require("./libs/constants/constants")
const response_message = require("./libs/constants/responseMessage")

const validate = (schema) => async (request, response, next) => {
  if (!schema || Object.keys(schema).length === 0) {
    throw new Error("Invalid validation schema")
  }

  const method = request.method.toUpperCase()
  let target = "body"

  if (method === "GET") {
    target = Object.keys(request.params || {}).length > 0 ? "params" : "query"
  }

  try {
    const joiSchema = schema[target]
    if (!joiSchema) {
      return next()
    }

    await joiSchema.validateAsync(request[target], { abortEarly: false })
    return next()
  } catch (err) {
    const formattedErrors = (err.details || []).map((error) => ({
      field: error.context?.key,
      message: error.message.replace(/['"]+/g, ""),
    }))

    return sendResponse.sendError(
      request,
      response,
      {
        data: formattedErrors,
        message: response_message.UNPROCESSABLE_CONTENT + `in the ${target}`,
      },
      constants.UNPROCESSABLE_ENTITY
    )
  }
}

module.exports = validate
