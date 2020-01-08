import {
  calcHashAnticipationDefault,
  calcDiscountPercentage,
  calcGenericAnticipationToObject,
  calcGenericAnticipationToNumber
} from './index'

describe('Testing hash-anticipation-calc-lib', () => {
  it('When making a call to the method, the discount must be returned for the subsequent ' +
  'day periods, 15, 30, and 90.', () => {
    const response = calcHashAnticipationDefault(3, 4, 150)
    expect(response.length).toBe(4)
    expect(response[0].anticipationDate).toBe('tomorrow')
    expect(response[0].discountedInstallment).toBe('132.67')
    expect(response[1].anticipationDate).toBe('15 days')
    expect(response[1].discountedInstallment).toBe('135.36')
    expect(response[2].anticipationDate).toBe('30 days')
    expect(response[2].discountedInstallment).toBe('138.24')
    expect(response[3].anticipationDate).toBe('90 days')
    expect(response[3].discountedInstallment).toBe('144.00')
  })

  it('When making a call to the method, informing the specific period of 15 days in advance, ' +
  'you must return the equivalent value in object format {key, value}.', () => {
    const response = calcGenericAnticipationToObject(3, 4, 150, 15)
    expect(response.length).toBe(1)
    expect(response[0].anticipationDate).toBe(15)
    expect(response[0].discountedInstallment).toBe('135.36')
  })

  it('When making a call to the method, informing the specific period of 15 days in advance, ' +
  'you must return the equivalent value in numerical format.', () => {
    const response = calcGenericAnticipationToNumber(3, 4, 150, 15)
    expect(response).toBe('135.36')
  })

  it('When making a call to the method, entering values for a simple interest calculation, ' +
  'you must return an object with the entered value information, minus the discount.', () => {
    const response = calcDiscountPercentage(10, 150)
    expect(response[0].discountedValue).toBe(135)
  })

  it('When making a call to the method, informing the number of parcels with value less than 1, ' +
  'the specific treatment error message should be returned.', () => {
    const response = calcHashAnticipationDefault(0, 4, 150)
    expect(response[0].resultType).toBe('ERROR')
    expect(response[0].description).toBe('Installment value must be greater than or equal to 1')
  })

  it('When making a call to the method stating the MDR rate value less than 1, the specific ' +
  'handling error message should be returned.', () => {
    const response = calcHashAnticipationDefault(3, 0, 150)
    expect(response[0].resultType).toBe('ERROR')
    expect(response[0].description).toBe('MDR percentage value must be greater than or equal to 1')
  })

  it('When making a call to the method stating a sales value of less than 1, the specific ' +
  'handling error message should be returned.', () => {
    const response = calcHashAnticipationDefault(3, 4, 0)
    expect(response[0].resultType).toBe('ERROR')
    expect(response[0].description).toBe('Selling value must be greater than 0')
  })

  it('When making a call to the method, requesting the calculation for a specific period ' +
  'and informing the sales value of less than 1, the specific handling error message should be returned.', () => {
    const response = calcGenericAnticipationToNumber(3, 4, 150, 0)
    expect(response[0].resultType).toBe('ERROR')
    expect(response[0].description).toBe('Number of anticipation days must be greater than 0')
  })
})
