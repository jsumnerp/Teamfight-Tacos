const regionMapping: Record<string, string> = {
  EUW1: 'europe',
  NA1: 'americas',
}

const defaultRegion = 'europe'

export const getRegion = (region: string): string =>
  regionMapping[region] ?? defaultRegion

