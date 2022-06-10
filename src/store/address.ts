import { createSlice } from '@reduxjs/toolkit'

interface Address {
  street: string
  neighborhood: string
  state: string
  city: string
  addressCode: string
  addressNumber: string
  complement: string
}



export const address = createSlice({
  name: 'saveAddress',
  initialState: {
    fullAddress: {} as Address
  },
  reducers: {
    save: (state, action) => {
     state.fullAddress = action.payload
    },
  },
})


export const { save  } = address.actions

export default address.reducer