const constants = require('./constants/constants')

module.exports = {
  sendSuccess: (request, response, data, message, status_code = 200) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

    if (request.method === 'OPTIONS') {
      return response.status(200).end()
    }

    return response.status(status_code).json({
      status: true,
      message: message || constants.SUCCESS,
      data,
    })
  },

  sendError: (request, response, error, status_code) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    error.status_code = error.status_code ? error.status_code : 500
    if (request.method === 'OPTIONS') {
      return response.status(error.status_code).end()
    }

    return response.status(status_code || 401).json({
      status: false,
      message: error.message,
      code: error.code,
      error: error.error || error.data || error,
    })
  },
}
