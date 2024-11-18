import React from 'react'
import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.actions';

const SignUp = async () => {
  // WE JUST WANT TO SHOW US THAT GETTING OUR LOGGED IN USER WORKS WE DONT HAVE TO USE IT HERE
  //const loggedInUser = await getLoggedInUser();
  // we have to stringnify the getLoggedInUser function from our user action 
  // in order not to return null 
  //console.log(loggedInUser)
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-up'/>
    </section>
  )
}

export default SignUp
