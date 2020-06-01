import React, {useState, createContext} from 'react'
import {cookie} from './lib/tools';

export const AppContext = createContext()

// Data store
export const AppProvider = function(props) {
  const context = {}
  const isLoggedIn = !!cookie('user')
  context.auth = useState(isLoggedIn)
  context.notify = useState('')

  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  )
}