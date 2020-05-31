import React, {useState, createContext} from 'react'
import {cookie} from './lib/tools';

export const AppContext = createContext()

// Data store
export const AppProvider = function(props) {
  const isLoggedIn = !!cookie('user')
  const [authenticated, setAuthenticated] = useState(isLoggedIn)

  return (
    <AppContext.Provider value={[authenticated, setAuthenticated]}>
      {props.children}
    </AppContext.Provider>
  )
}