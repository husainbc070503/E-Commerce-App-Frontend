import { Zoom, toast } from "react-toastify";
import { URL } from "../../Utils/API";
import logo from "../../images/logo.png";

const Payment = async (user, products, totalPrice) => {
  try {
    const res = await fetch(`${URL}/api/order/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },  
      body: JSON.stringify({
        products: JSON.stringify(products),
        totalPrice,
      }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_FlqRfa8gpkyIvH",
      amount: data.amount,
      name: data.name,
      description: data.description,
      order_id: data.id,
      currency: data.currency,
      image: logo,

      handler: (response) => {
        toast.info(`Payment Id: ${response.razorpay_payment_id}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });

        toast.info(`Order Id: ${response.razorpay_order_id}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Zoom,
        });

        toast.success(
          "Thank you for purchasing our products. Your product will be delivered soon to your address.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          }
        );
      },

      prefill: {
        name: data.order.user.name,
        email: data.order.user.email,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

export default Payment;
