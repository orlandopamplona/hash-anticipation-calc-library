export const MSG_ERROR = 'ERROR'
export const MSG_ERROR_INSTALLMENT_VALUE = 'Installment value must be greater than or equal to 1'
export const MSG_ERROR_MDR_PERCENTAGE_VALUE = 'MDR percentage value must be greater than or equal to 1'
export const MSG_ERROR_GROSS_VALUE = 'Selling value must be greater than 0'
export const MSG_ERROR_NUMBER_ANTICIPATION = 'Number of anticipation days must be greater than 0'
export const DAYS = 'Days'
export const DEFAULT_MESSAGE_SUCCESS = 'Message successfully returned'

export const ANTICIPATION_BUSINESS_MONTH_DAYS = 30
export const FULL_PERCENTAGE_VALUE = 100
export const MONTH_TRADE_DAYS = 30
export const TYPE_RESPONSE_OBJECT = 'OBJECT'
export const TYPE_RESPONSE_NUMBER = 'NUMBER'

export const messageTypeEnum = {
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ANTICIPATION: 'ANTICIPATION',
  DISCOUNT_PERCENTAGE: 'DISCOUNT_PERCENTAGE'
}

export const numberOfDays = {
  TOMORROW: 'tomorrow',
  DAYS_15: '15 days',
  DAYS_30: '30 days',
  DAYS_90: '90 days'
}

export const LIST_NUMBER_DAYS = [
  numberOfDays.TOMORROW,
  numberOfDays.DAYS_15,
  numberOfDays.DAYS_30,
  numberOfDays.DAYS_90
]

export const INSTALLMENTS_DEFAULT = [1, 15, 30, 90]
