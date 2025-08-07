/*
 * Pricing service for study clubs.
 *
 * This module encapsulates the pricing logic used to calculate the
 * base monthly subscription fee for a study club and derive the
 * per-member fee based on the leader's contribution.  It mirrors the
 * slider behaviour in the front-end prototype, where club leaders can
 * subsidise some or all of the monthly cost.
 */

export interface PricingInput {
  /** Number of seats in the club (between 8 and 18). */
  seats: number;
  /** Amount the leader chooses to contribute toward the monthly fee. */
  leaderContribution: number;
}

export interface PricingResult {
  /** Base monthly price for the club before leader contribution. */
  basePrice: number;
  /** Computed monthly fee each member must pay. */
  memberFee: number;
}

/**
 * Determine the base monthly price based on the number of seats.  This
 * function reflects the three tiers described in the pricing slider:
 *  - Seats 8–11: $2,000/month
 *  - Seats 12–15: $2,400/month
 *  - Seats 16–18: $2,700/month
 *
 * @param seats Number of seats requested
 * @returns The base price in USD
 */
export function getBasePrice(seats: number): number {
  if (seats >= 8 && seats <= 11) {
    return 2000;
  } else if (seats >= 12 && seats <= 15) {
    return 2400;
  } else {
    return 2700;
  }
}

/**
 * Compute the member fee and return both the base and per-member fees.
 *
 * @param input PricingInput containing seat count and leader contribution
 * @returns PricingResult with base and member fees
 */
export function calculateMemberFee(input: PricingInput): PricingResult {
  const { seats, leaderContribution } = input;
  const basePrice = getBasePrice(seats);
  const memberFee = (basePrice - leaderContribution) / seats;
  return { basePrice, memberFee };
}
