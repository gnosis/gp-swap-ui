import React from 'react'
import AppMod from './AppMod'
import styled from 'styled-components'
import { RedirectPathToSwapOnly, RedirectToSwap } from 'pages/Swap/redirects'
import { Route, Switch } from 'react-router-dom'
import Swap from 'pages/Swap'
import PrivacyPolicy from 'pages/PrivacyPolicy'
import CookiePolicy from 'pages/CookiePolicy'
// import About from 'pages/About'

export const Wrapper = styled(AppMod)``

export default function App() {
  return (
    <Wrapper>
      <Switch>
        <Route exact strict path="/swap" component={Swap} />
        <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
        <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
        {/* TODO: re-enable once about is finalized */}
        {/* <Route exact strict path="/about" component={About} /> */}
        <Route exact strict path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact strict path="/cookie-policy" component={CookiePolicy} />
        <Route component={RedirectPathToSwapOnly} />
      </Switch>
    </Wrapper>
  )
}
