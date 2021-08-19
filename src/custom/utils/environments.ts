const getRegex = (regex: string | undefined) => (regex ? new RegExp(regex) : undefined)

export function checkEnvironment(host: string) {
  const domainLocalRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_LOCAL)
  const domainPrRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_PR)
  const domainDevRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_DEV)
  const domainStagingRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_STAGING)
  const domainProdRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_PROD)
  const domainEnsRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_ENS)
  const domainBarnRegex = getRegex(process.env.REACT_APP_DOMAIN_REGEX_BARN)

  return {
    // Project environments
    isLocal: domainLocalRegex?.test(host) || false,
    isDev: domainDevRegex?.test(host) || false,
    isPr: domainPrRegex?.test(host) || false,
    isStaging: domainStagingRegex?.test(host) || false,
    isProd: domainProdRegex?.test(host) || false,
    isEns: domainEnsRegex?.test(host) || false,

    // Environment used for Backend workflow
    //  Latest stable version pointing to the DEV api
    isBarn: domainBarnRegex?.test(host) || false,
  }
}

const { isLocal, isDev, isPr, isStaging, isProd, isEns, isBarn } = checkEnvironment(window.location.host)

export const environmentName = (function () {
  if (isProd) {
    return 'production'
  } else if (isBarn) {
    return 'barn'
  } else if (isEns) {
    return 'ens'
  } else if (isStaging) {
    return 'staging'
  } else if (isPr) {
    return 'pr'
  } else if (isDev) {
    return 'development'
  } else if (isLocal) {
    return 'local'
  } else {
    return undefined
  }
})()

export { isLocal, isDev, isPr, isBarn, isStaging, isProd, isEns }
