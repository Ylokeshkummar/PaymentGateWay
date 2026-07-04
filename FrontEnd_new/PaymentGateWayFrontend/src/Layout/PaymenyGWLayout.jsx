import React from 'react'
import PaymentHeader from '../PaymentGateWay/Components/PaymentHeader'
import PaymentFooter from '../PaymentGateWay/Components/PaymentFooter'
import { Outlet } from 'react-router-dom'

const PaymenyGWLayout = () => {
  return (
    <div>
        <PaymentHeader/>
        <Outlet/>
        <PaymentFooter/>
    </div>
  )
}

export default PaymenyGWLayout