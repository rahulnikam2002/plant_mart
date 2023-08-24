import React from 'react'
import { TextInput } from './Inputs'

describe('<TextInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TextInput />)
  })
})