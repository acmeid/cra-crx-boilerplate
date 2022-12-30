export enum FixedDepositPeriod {
  PERIOD_1_MONTHS = 0,
  PERIOD_3_MONTHS = 1,
  PERIOD_6_MONTHS = 2,
  PERIOD_12_MONTHS = 3,
  PERIOD_24_MONTHS = 4,
  PERIOD_48_MONTHS = 5,
  UNRECOGNIZED = -1,
}

export const FixedDepositData: any = {
  PERIOD_1_MONTHS: {
    period: 1,
    name: 'Time limit 30 Days',
    code: 0,
    reward: 0.12,
    alias: 'annualRate_1_months',
  },
  PERIOD_3_MONTHS: {
    period: 3,
    name: 'Time limit 90 Days',
    code: 1,
    reward: 0.15,
    alias: 'annualRate_3_months',
  },
  PERIOD_6_MONTHS: {
    period: 6,
    name: 'Time limit 180 Days',
    code: 2,
    reward: 0.2,
    alias: 'annualRate_6_months',
  },
  PERIOD_12_MONTHS: {
    period: 12,
    name: 'Time limit 360 Days',
    code: 3,
    reward: 0.3,
    alias: 'annualRate_12_months',
  },
  PERIOD_24_MONTHS: {
    period: 24,
    name: 'Time limit 720 Days',
    code: 4,
    reward: 0.4,
    alias: 'annualRate_24_months',
  },
  PERIOD_48_MONTHS: {
    period: 48,
    name: 'Time limit 1440 Days',
    code: 5,
    reward: 0.5,
    alias: 'annualRate_48_months',
  },
}

export const FixedDepositData2: any = (() => {
  const data: any = {}
  for (const key in FixedDepositData) {
    if (Object.prototype.hasOwnProperty.call(FixedDepositData, key)) {
      const element = FixedDepositData[key]
      data[element.alias] = element
    }
  }

  return data
})()

const gas_limit = 200000
const gas_price = 500
export const baseFee = gas_limit * gas_price
