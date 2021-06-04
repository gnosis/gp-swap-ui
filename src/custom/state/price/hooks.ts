import { useActiveWeb3React } from '@src/hooks'
import { useSwapState } from '@src/state/swap/hooks'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import {
  updateQuote,
  clearQuote,
  UpdateQuoteParams,
  ClearQuoteParams,
  setNewQuoteLoad,
  SetLoadingQuoteParams,
  setRefreshQuoteLoad
} from './actions'
import { QuoteInformationObject, QuotesMap } from './reducer'

type GetNewQuoteCallback = (quoteLoadingParams: SetLoadingQuoteParams) => void
type RefreshCurrentQuoteCallback = (quoteLoadingParams: Pick<SetLoadingQuoteParams, 'loading'>) => void
type AddPriceCallback = (addFeeParams: UpdateQuoteParams) => void
type ClearPriceCallback = (clearFeeParams: ClearQuoteParams) => void

export const useAllQuotes = ({
  chainId
}: Partial<Pick<ClearQuoteParams, 'chainId'>>): Partial<QuotesMap> | undefined => {
  return useSelector<AppState, Partial<QuotesMap> | undefined>(state => {
    const quotes = chainId && state.price.quotes[chainId]

    if (!quotes) return {}

    return quotes
  })
}

export const useQuote = ({ token, chainId }: Partial<ClearQuoteParams>): QuoteInformationObject | undefined => {
  return useSelector<AppState, QuoteInformationObject | undefined>(state => {
    const fees = chainId && state.price.quotes[chainId]

    if (!fees) return undefined

    return token ? fees[token] : undefined
  })
}

export const useIsQuoteLoading = () =>
  useSelector<AppState, boolean>(state => {
    return state.price.loading
  })

interface UseGetQuoteAndStatus {
  quote?: QuoteInformationObject
  isGettingNewQuote: boolean
  isRefreshingQuote: boolean
}

export const useGetQuoteAndStatus = (params: Partial<ClearQuoteParams>): UseGetQuoteAndStatus => {
  const quote = useQuote(params)
  const isLoading = useIsQuoteLoading()

  const isGettingNewQuote = Boolean(isLoading && !quote?.price.amount)
  const isRefreshingQuote = Boolean(isLoading && quote?.price.amount)

  return { quote, isGettingNewQuote, isRefreshingQuote }
}

// syntactic sugar for not needing to pass swapstate
export function useIsQuoteRefreshing() {
  const { chainId } = useActiveWeb3React()
  const {
    INPUT: { currencyId }
  } = useSwapState()
  const { isRefreshingQuote } = useGetQuoteAndStatus({ token: currencyId, chainId })
  return isRefreshingQuote
}

export function useIsQuoteSoftLoading() {
  const { chainId } = useActiveWeb3React()
  const {
    INPUT: { currencyId }
  } = useSwapState()
  const { isRefreshingQuote } = useGetQuoteAndStatus({ token: currencyId, chainId })
  return isRefreshingQuote
}

export const useSetNewQuoteLoad = (): GetNewQuoteCallback => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((quoteLoadingParams: SetLoadingQuoteParams) => dispatch(setNewQuoteLoad(quoteLoadingParams)), [
    dispatch
  ])
}

export const useSetRefreshQuoteLoad = (): RefreshCurrentQuoteCallback => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (quoteLoadingParams: Pick<SetLoadingQuoteParams, 'loading'>) => dispatch(setRefreshQuoteLoad(quoteLoadingParams)),
    [dispatch]
  )
}

export const useUpdateQuote = (): AddPriceCallback => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((updateQuoteParams: UpdateQuoteParams) => dispatch(updateQuote(updateQuoteParams)), [dispatch])
}

export const useClearQuote = (): ClearPriceCallback => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback((clearQuoteParams: ClearQuoteParams) => dispatch(clearQuote(clearQuoteParams)), [dispatch])
}

interface QuoteDispatchers {
  setNewQuoteLoad: GetNewQuoteCallback
  setRefreshQuoteLoad: RefreshCurrentQuoteCallback
  updateQuote: AddPriceCallback
  clearQuote: ClearPriceCallback
}

export const useQuoteDispatchers = (): QuoteDispatchers => {
  return {
    setNewQuoteLoad: useSetNewQuoteLoad(),
    setRefreshQuoteLoad: useSetRefreshQuoteLoad(),
    updateQuote: useUpdateQuote(),
    clearQuote: useClearQuote()
  }
}
