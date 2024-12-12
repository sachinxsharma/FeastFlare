import React, { useRef,useEffect } from 'react'

const PayPal = () => {

  const paypal = useRef() 
   useEffect(()=>{
    window.paypal.Buttons({
        createOrder:(data,actions,err)=>{
            return actions.order.create({
                intent:"CAPTURE",
                purchase_units:[{
                    description:"TASTY FOOD ",
                    amount:{
                        currency_code:"CAD",
                        value: 800.00
                    }
                }]
            })
        },
        onApprove:async(data,action)=>{
           const order = await action.order.capture()
           console.log(order);
        },
        onError: (err)=>{
            console.log(err)
        }

    })
    .render(paypal.current)
   },[])

  return (
    <div>
       <div ref = {paypal}></div>
    </div>
  )
}

export default PayPal