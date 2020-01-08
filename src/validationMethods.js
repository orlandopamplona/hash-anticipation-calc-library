import * as constants from './constants'
import * as msgResponse from './callbackMessagesToUser'

/**
 * @descriptionPerforms Performs validation of reported values based on previously defined rules.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @returns {array} - List with all error messages coming from validation.
 */
export const validationInputs = (installments, mdrPercentage, grossValue) => {
  const msgErrosValidation = []

  if (isNaN(installments) || installments < 1) {
    msgErrosValidation.push(msgResponse.prepareGenericMsgReturn(constants.MSG_ERROR, constants.MSG_ERROR_INSTALLMENT_VALUE))
  }

  if (isNaN(mdrPercentage) || mdrPercentage <= 0) {
    msgErrosValidation.push(msgResponse.prepareGenericMsgReturn(constants.MSG_ERROR, constants.MSG_ERROR_MDR_PERCENTAGE_VALUE))
  }

  if (isNaN(grossValue) || grossValue < 1) {
    msgErrosValidation.push(msgResponse.prepareGenericMsgReturn(constants.MSG_ERROR, constants.MSG_ERROR_GROSS_VALUE))
  }

  return msgErrosValidation
}

/**
 * @descriptionPerforms Performs the calculation for any advance date, displaying the result in the structure of
 *                      an object, only for the requested period.
 * @param numberOfDays - Indicates the number of days corresponding to the anticipation period.
 * @returns {array} - Element with the error message from validation.
 */
export const validationInputPeriod = (numberOfDays) => {
  const msgErrosValidation = []
  if (isNaN(numberOfDays) || numberOfDays < 1) {
    msgErrosValidation.push(msgResponse.prepareGenericMsgReturn(constants.MSG_ERROR, constants.MSG_ERROR_NUMBER_ANTICIPATION))
  }
  return msgErrosValidation
}
