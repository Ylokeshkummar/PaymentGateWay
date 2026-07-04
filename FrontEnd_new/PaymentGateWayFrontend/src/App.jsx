import React from 'react'
import Header from './Profile/Components/Header'
import Footer from './Profile/Components/Footer'
import Home from './Profile/Pages/Home'
import About from './Profile/Pages/About'
import ContactMe from './Profile/Pages/ContactMe'
import Experience from './Profile/Pages/Experience'
import ProjectDetails from './Profile/Pages/ProjectDetails'
import Body from './Profile/Components/Body'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './Layout/RootLayout'
import PaymenyGWLayout from './Layout/PaymenyGWLayout'
import PaymentGwBeforeLogin from './Layout/PaymentGwBeforeLogin'
import PaymentGateHome from './PaymentGateWay/Pages/PaymentGateHome'
import ForgotPassword from './PaymentGateWay/Pages/ForgotPassword'
import LoginPage from './PaymentGateWay/Pages/LoginPage'
import SignUp from './PaymentGateWay/Pages/SignUp'
import Dashboard from './PaymentGateWay/Pages/Dashboard'
import PaymentDetails from './PaymentGateWay/Pages/PaymentDetails'
import PaymentsShakeHandPage from './PaymentGateWay/Pages/PaymentsShakeHandPage'
import Profile from './PaymentGateWay/Pages/Profile'
import Transaction, { TransactionDetailsLoader } from './PaymentGateWay/Pages/TransactionDetails'
import ManageBusiness from './PaymentGateWay/Pages/ManageBusiness'
import TransactionsList from './PaymentGateWay/Pages/TransactionsList'
import TransactionDetails from './PaymentGateWay/Pages/TransactionDetails'


const App = () => {
const routerB=createBrowserRouter(
  createRoutesFromElements(
  <><Route path='/' element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='About' element={<About/>} />
            <Route path='Experience' element={<Experience/>} />
            <Route path='ProjectDetails' element={<ProjectDetails/>} />
            <Route path='ContactMe' element={<ContactMe/>} />
  </Route>
  <Route path='/PaymentGateWayHome' element={<PaymentGwBeforeLogin/>}>
            <Route index element={<PaymentGateHome/>}/>
            <Route path='ForgotPassword' element={<ForgotPassword/>} />
            <Route path='LoginPage' element={<LoginPage/>} />
             <Route path='SignUp' element={<SignUp/>} />
  </Route>
  <Route path='/PaymentGateWay' element={<PaymenyGWLayout/>}>
            <Route path='Dashboard' element={<Dashboard/>}/>
            <Route path='PaymentDetails' element={<PaymentDetails/>} />
            <Route path='PaymentsShakeHandPage' element={<PaymentsShakeHandPage/>} />
            <Route path='Profile' element={<Profile/>} />
              <Route path='Transaction' element={<TransactionsList/>} />
<Route  path="Transaction/:transactionId"  element={<TransactionDetails />} loader={TransactionDetailsLoader}
/>              <Route path='ManageBusiness' element={<ManageBusiness/>}/>
  </Route>
  </>
  ))

  return (
 <RouterProvider router={routerB}/>
  )
}

export default App