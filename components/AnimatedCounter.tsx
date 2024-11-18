'use client';
import React from 'react'
import CountUp from 'react-countup'; 
// react countup was installed to enable smooth count effect

const AnimatedCounter = ({amount} : {amount: number}) => {
  return (
    <span className='w-full'>
      <CountUp 
        duration={2.75}
        decimals={2}
        decimal=","
        prefix="#"
        end={amount} 
      />
    </span>
  )
}

export default AnimatedCounter