import * as operations from './anticipationMethods'
import * as validation from './validationMethods'
import * as constants from './constants'

/**
 * @description Performs calculation for advance dates set on later, 15, 30, and 90 days,
 *              presenting results in a single return.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @returns {array} - List with calculated values
 */
export const calcHashAnticipationDefault = (installments, mdrPercentage, grossValue) => {
  const validationResponse = validation.validationInputs(installments, mdrPercentage, grossValue)
  return validationResponse.length > 0 ? validationResponse : operations.calculatesDefaultAnticipation(installments, mdrPercentage, grossValue)
}

/**
 * @description Performs the calculation of a value subtracted from a certain percentage by
 *              returning an object with information of the original value, the discount
 *              percentage, and the amount already discounted.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param installments - Identifies the number of installments to be considered in the calculation
 *                       (receives the default value of 1).
 * @returns {array} - List with calculated values
 */
export const calcDiscountPercentage = (mdrPercentage, grossValue, installments = 1) => {
  const validationResponse = validation.validationInputs(installments, mdrPercentage, grossValue)
  return validationResponse.length > 0 ? validationResponse : operations.discountPercentageValue(mdrPercentage, grossValue)
}

/**
 * @descriptionPerforms Performs the calculation for any advance date, displaying the result in the structure of
 *                      an object, only for the requested period.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param numberOfDays - Specifies the period (number of days) that will be used as a reference for the anticipation calculation.
 * @returns {array} - List with calculated values
 */
export const calcGenericAnticipationToObject = (installments, mdrPercentage, grossValue, numberOfDays) => {
  return calcGenericAnticipation(installments, mdrPercentage, grossValue, numberOfDays, constants.TYPE_RESPONSE_OBJECT)
}

/**
 * @descriptionPerforms Performs the calculation for any advance date, displaying the result in the structure of a
 *                      single numeric value, only for the requested period.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param numberOfDays - Specifies the period (number of days) that will be used as a reference for the anticipation calculation.
 * @returns {number} - Calculated value
 */
export const calcGenericAnticipationToNumber = (installments, mdrPercentage, grossValue, numberOfDays) => {
  return calcGenericAnticipation(installments, mdrPercentage, grossValue, numberOfDays, constants.TYPE_RESPONSE_NUMBER)
}

/**
 * @descriptionPerforms Performs the calculation common to the methods (calculation requested for
 *                      any anticipation period, both for object format and numeric value), performing
 *                      the calculation of the anticipation value itself.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @param numberOfDays - Specifies the period (number of days) that will be used as a reference for the anticipation calculation.
 * @param typeResponse - Specifies whether to return the calculation in numeric format or in object structure.
 */
const calcGenericAnticipation = (installments, mdrPercentage, grossValue, numberOfDays, typeResponse) => {
  const validationResponse = (validation.validationInputs(installments, mdrPercentage, grossValue)).concat(validation.validationInputPeriod(numberOfDays))
  return validationResponse.length > 0 ? validationResponse : operations.calculatesGenericAnticipation(installments, mdrPercentage, grossValue, numberOfDays, typeResponse)
}

export default { calcHashAnticipationDefault, calcDiscountPercentage, calcGenericAnticipationToObject, calcGenericAnticipationToNumber }