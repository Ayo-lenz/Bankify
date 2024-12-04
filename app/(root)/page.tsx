import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'


// in nextjs we have access to searchParams where we can destructure the id and page for pagination
const Home = async ({searchParams: {id, page}}: SearchParamProps) => {
  /* we want to fetch the loggedIn information from the logged in user  section
  instead of the static data we hardcoded at the start
  */
 const currentPage = Number(page as string ) || 1;
  const loggedIn = await getLoggedInUser();
  //{firstName : 'Ayolenz', lastName:'AJS', email: 'johnlenzvictor@gmail.com'}

  //we want to use the bank information of the user that we fetch from the bank actions
  // to get data for multiple accounts
  const user_id = loggedIn.$id;
  const accounts = await getAccounts({
    userId: user_id
  })

  if(!accounts) return;
  

  //to get data for a singular account
  //const appwriteItemId = ( id as string) || accounts?.data[0]?.appwriteItemId
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId })
  //console.log({accountsData, account})

  return (
    <section className='home'>
      <div className='home-content'> 
        <header className='home-header'>
          <HeaderBox 
            type='greeting'
            title='Welcome'
            user={loggedIn?.firstName || 'Guest'}
            subtext='Access and manage your account and transactions efficiently.'
          />

          <TotalBalanceBox
            accounts={accountsData} // all of our accounts that we have
            totalBanks={accounts.totalBanks} 
            totalCurrentBalance={accounts?.totalCurrentBalance} 
          />
        </header>

        <RecentTransactions
          accounts ={accountsData}
          transactions ={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        /> 
      </div>

      <RightSideBar
        user = {loggedIn}
        transactions = {account?.transactions}
        banks = {accounts?.data.slice(0, 2)} 
      />
    </section>
  )
}

export default Home