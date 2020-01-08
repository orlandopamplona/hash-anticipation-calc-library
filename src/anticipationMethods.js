import * as constants from './constants'
import * as msgResponse from './callbackMessagesToUser'

/**
 * @description Performs a series of calculations with user-entered parameters
 *              to set the initial values of the operation.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @returns {array} List of values that will be used to initialize calculations.
 * */
const calculateInitialValuesToAnticipation = (installments, mdrPercentage, grossValue) => {
  const discountValue = mdrPercentage / constants.FULL_PERCENTAGE_VALUE
  const dailyDiscountValue = discountValue / constants.MONTH_TRADE_DAYS
  const discountedMDRValue = grossValue - (discountValue * grossValue)
  const installmentValue = discountedMDRValue / installments

  const initialValues = {
    dailyDiscount: dailyDiscountValue,
    discountedValueMDR: discountedMDRValue,
    installment: installmentValue
  }
  return initialValues
}

/**
 * @description Mounts the return object to the standard requisition with fixed periods.
 * @param installments - Identifies the number of installments to be considered in the calculation.
 * @param mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
 * @param grossValue - Amount of the total over which the anticipation will be applied.
 * @returns {Object} Element with the overall anticipation results.
 * */
export const calculatesDefaultAnticipation = (installments, mdrPercentage, grossValue) => {
  let discountedInstallments = []

  constants.INSTALLMENTS_DEFAULT.forEach((element, index) => {
    discountedInstallments.push({
      numberDays: constants.LIST_NUMBER_DAYS[index],
      value: calculatesGenericAnticipation(installments,
        mdrPercentage,
        grossValue,
        element,
        constants.TYPE_RESPONSE_NUMBER)
    })
  })

  return msgResponse.prepareGenericMsgReturn(constants.messageTypeEnum.ANTICIPATION, discountedInstallments)
}

/**
 * @description Performs the calculation of the amount that will be deducted from the installment.
 * @param {number} installmentValue Displays the value of the parcel calculated based on information provided by the user.
 * @param {number} numberOfDays Number of days calculated based on number of installments and advance period.
 * @param {number} dailyDiscount Daily discount amount calculated based on monthly discount amount (MDR rate).
 * @returns {number} Amount of the installment already discounted the corresponding advance.
 * */
const calculateAnticipationValue = (installmentValue, numberOfDays, dailyDiscount) => {
  return installmentValue - ((numberOfDays * dailyDiscount) * installmentValue)
}

/**
 * @description Performs the calculation of the amount that will be deducted from the installment.
 * @param {number} installmentValue Displays the value of the parcel calculated based on information provided by the user.
 * @param {number} dailyDiscount Daily discount amount calculated based on monthly discount amount (MDR rate).
 * @returns {Object} Amount of the installment already discounted the corresponding advance.
 * */
export const discountPercentageValue = (mdrPercentage, grossValue) => {
  const discounted = grossValue - (grossValue * (mdrPercentage / constants.FULL_PERCENTAGE_VALUE))
  return msgResponse.prepareGenericMsgReturn(constants.messageTypeEnum.DISCOUNT_PERCENTAGE,
    null, grossValue, mdrPercentage, discounted)
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
export const calculatesGenericAnticipation = (installments, mdrPercentage, grossValue, numberOfDays, typeResponse) => {
  let {
    dailyDiscount,
    installment
  } = calculateInitialValuesToAnticipation(installments, mdrPercentage, grossValue)
  const defaultInstallments = generateGenericDefault(installments)
  const reducer = (accumulator, currentValue) => accumulator + calculateAnticipationValue(installment,
    (currentValue - numberOfDays) < 0 ? 0 : currentValue - numberOfDays, dailyDiscount)
  const valueToReturn = (defaultInstallments.reduce(reducer, 0)).toFixed(2)

  return typeResponse === constants.TYPE_RESPONSE_NUMBER
    ? valueToReturn
    : msgResponse.prepareGenericMsgReturn(
      constants.messageTypeEnum.ANTICIPATION,
      [{ numberDays: numberOfDays, value: valueToReturn }]
    )
}

/**
 * @description Generates a dynamic list with all possible anticipation periods, considering the
 *              30-day business month and the number of installments entered.
 * @param {number} installmentValue Displays the value of the parcel calculated based on information provided by the user.
 * @returns {array} List with all anticipation periods.
 * */
const generateGenericDefault = (installments) => {
  const initListDays = [constants.ANTICIPATION_BUSINESS_MONTH_DAYS]
  for (let i = 0; i < installments - 1; i++) {
    initListDays.push(initListDays[i] + constants.ANTICIPATION_BUSINESS_MONTH_DAYS)
  }
  return initListDays
}
