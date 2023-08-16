import React from 'react'

export const PageContext = React.createContext<number>(0)
export const IsActiveContext = React.createContext<React.Dispatch<React.SetStateAction<boolean>> | null>(null)