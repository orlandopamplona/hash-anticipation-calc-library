import * as constants from './constants'

/**
 * @description Returns a message to the user with a given description and type defined.
 * @param {string} messageType Error message type (error, information, etc.)
 * @param {string} messageDescription Description of the message scenario
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param discounted - Result value, already discounted the respective percentage.
 * @returns {Object} Element with message information.
 * */
export const prepareGenericMsgReturn = (messageType = constants.messageTypeEnum.INFO, messageDescription = constants.DEFAULT_MESSAGE_SUCCESS, grossValue = 0, mdrPercentage = 0, discounted = 0) => {
  const prepareMsg = {
    ERROR: () => prepareMsgResponse(constants.messageTypeEnum.ERROR, messageDescription),
    INFO: () => prepareMsgResponse(constants.messageTypeEnum.INFO, messageDescription),
    WARNING: () => prepareMsgResponse(constants.messageTypeEnum.WARNING, messageDescription),
    ANTICIPATION: () => prepareValidResponseAnticipation(messageDescription),
    DISCOUNT_PERCENTAGE: () => prepareMsgResponseDiscountPercentage(grossValue, mdrPercentage, discounted)
  }
  return prepareMsg[messageType]()
}

/**
 * @description Assemble the response object by informing the response type and the corresponding textual description.
 * @param {string} messageType Error message type (error, information, etc.)
 * @param {string} messageDescription Description of the message scenario
 * @returns {Object} Element with message information.
 * */
const prepareMsgResponse = (messageType, messageDescription) => {
  return { resultType: messageType, description: messageDescription }
}

/**
 * @description Assemble the response object by informing the response type and the corresponding textual description.
 * @param {array} informedDiscounts List with calculated results
 * @returns {Object} Element with result information.
 * */
const prepareValidResponseAnticipation = (informedDiscounts) => {
  const itensResponse = informedDiscounts.map(ratedPeriod => {
    const {
      numberDays,
      value
    } = ratedPeriod
    return { anticipationDate: numberDays, discountedInstallment: value }
  })

  return itensResponse
}

/**
 * @description Assemble the return object with the input information and the result of the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param discounted - Result value, already discounted the respective percentage.
 * @returns {Object} Element with result information.
 * */
const prepareMsgResponseDiscountPercentage = (grossValue, mdrPercentage, discounted) => {
  const result = [
    { originalValue: grossValue, percentage: mdrPercentage, discountedValue: discounted }
  ]
  return result
}
