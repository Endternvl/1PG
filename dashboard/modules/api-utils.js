module.exports.sendError = (res, {
  code = 400,
  message = 'An unknown error occurred.'
}) => res.status(code).json({ code, message });
