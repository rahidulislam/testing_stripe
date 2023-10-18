import { useStripe, useElements, CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from 'axios'
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    
    axios.post("http://localhost:8000/payment/api/v1/payment-intent/", 

       {
        order: 1,
        currency: "USD",
        payment_method_types: ["card"],
      },
      {headers:{
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk3NjQzNDMzLCJpYXQiOjE2OTc2Mzk4MzMsImp0aSI6ImQwZjM3ZjhkZjgyYzRiZWZhYjA0NDEyODZmOGI1ZWRjIiwidXNlcl9pZCI6MTl9.44wvOa0mClaeClUcvq_p3ptQOj6cbARJvqOTBF4_n40",
      }}
    )
      .then((res) => setPaymentIntent(res.data))
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
      });
  }, []);
console.log("payment intent:",paymentIntent)

// console.log("client_secret_detail:",client_secret)

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    // console.log("payment intent:",paymentIntent)
    const result = await stripe.confirmCardPayment(paymentIntent.client_secret, {
      // elements,
      // confirmParams: {
      //   // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
      //   return_url: 'https://example.com',
      // },
      // redirect: "if_required",
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
          email: '9gV9l@example.com',
          phone: '555-555-5555',
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Success!");
        console.log(result);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  );
};

export default CheckoutForm;
