import {
  CLAIMS_REPO,
  ClaimType,
  FREE_CLAIM_TYPES,
  PAID_CLAIM_TYPES,
  RepoClaims,
  UserClaims,
} from 'state/claim/hooks/index'

/**
 * Helper function to check whether any claim is an investment option
 *
 * @param claims
 */
export function hasPaidClaim(claims: UserClaims | null): boolean {
  return claims?.some((claim) => claim.type in PAID_CLAIM_TYPES) || false
}

/**
 * Helper function to check whether any claim is an airdrop option
 *
 * @param claims
 */
export function hasFreeClaim(claims: UserClaims | null): boolean {
  return claims?.some((claim) => claim.type in FREE_CLAIM_TYPES) || false
}

/**
 * Helper function to transform data as coming from the airdrop claims repo onto internal types
 *
 * Namely, converting types from their string representations to the enum numbers:
 * Airdrop -> 0
 */
export function transformRepoClaimsToUserClaims(repoClaims: RepoClaims): UserClaims {
  return repoClaims.map((claim) => ({ ...claim, type: ClaimType[claim.type] }))
}

/**
 * Helper function to get the repo path for the corresponding network id
 * Throws when passed an unknown network id
 */
export function getClaimsRepoPath(id: number): string {
  return `${CLAIMS_REPO}${_repoNetworkIdMapping(id)}/`
}

function _repoNetworkIdMapping(id: number): string {
  switch (id) {
    case 1:
      return 'mainnet'
    case 4:
      return 'rinkeby'
    case 100:
      return 'gnosis-chain'
    default:
      throw new Error('Network not supported')
  }
}

