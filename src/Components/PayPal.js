import React, { useRef, useEffect } from 'react';

const PayPal = ({ totalAmount }) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          const calculatedAmount = (totalAmount + 2.5).toFixed(2);

          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'TASTY FOOD',
                amount: {
                  currency_code: 'CAD',
                  value: calculatedAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, action) => {
          const order = await action.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [totalAmount]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;
