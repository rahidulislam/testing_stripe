import "./App.css";
import CheckoutForm from "./components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51L172mBCqxntKydbxWx8GDqCdYCogC9SHXhtjDL2xiBJtpf52tZYpGuv2xukkcmeOe3WPjZLYlFAfVhY3eRTfcTZ00qtwoXw96"
  );

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
