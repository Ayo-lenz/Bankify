import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {
  /* we want to fetch the loggedIn information from the logged in user  section
  instead of the static data we hardcoded at the start
  */
  const loggedIn = await getLoggedInUser();
  //{firstName : 'Ayolenz', lastName:'AJS', email: 'johnlenzvictor@gmail.com'}

  return (
    <section className='home'>
      <div className='home-content'> 
        <header className='home-header'>
          <HeaderBox 
            type='greeting'
            title='Welcome'
            user={loggedIn?.name || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
          />

          <TotalBalanceBox
            accounts={[]} // all of our accounts that we have
            totalBanks={1} 
            totalCurrentBalance={1250.35} 
          />
        </header>

        RECENT TRANSACTIONS 
      </div>

      <RightSideBar
        user = {loggedIn}
        transactions = {[]}
        banks = {[{ currentBalance : 145.77}, { currentBalance : 588.09 }]} 
      />
    </section>
  )
}

export default Home