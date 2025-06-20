import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import socketIO from "socket.io-client";
// const socketId = socketIO(process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "", {
//   transports: ["websocket"],
// });

type Props = {
  setOpen: (open: boolean) => void;
  courseData: any;
  user: any;
};

const CheckOutForm = ({ setOpen, courseData, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState<boolean>(false);
  const {} = useLoadUserQuery({
    skip: !loadUser,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error?.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);

      createOrder({
        courseId: courseData._id,
        payment_info: paymentIntent,
      });

      setMessage("Payment Successfull");
    }
  };

  useEffect(() => {
    if (orderData) {
      setLoadUser(true);
      setOpen(false);
      // socketId.emit("notification", {
      //   title: "New Order",
      //   message: `New order for ${courseData.name} by ${user.name}`,
      //   userId: user._id,
      // });
      redirect(`/course-access/${courseData._id}`);
    }
    if (error) {
      if ("data" in error) {
        const errMsg = error as any;
        toast.error(errMsg.data.message);
      }
    }
  }, [orderData, error, setOpen]);

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 space-y-6"
    >
      <LinkAuthenticationElement
        id="link-authentication-element"
        options={{
          defaultValues: { email: user.email },
        }}
        onChange={() => null}
        className="mb-4"
      />
      <PaymentElement id="payment-element" className="mb-6" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        <span id="button-text" className="inline-flex items-center">
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Paying...
            </>
          ) : (
            "Pay Now"
          )}
        </span>
      </button>

      {message && (
        <div
          id="payment-message"
          className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-center"
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
