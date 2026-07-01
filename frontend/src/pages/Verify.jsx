import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Verify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl border border-gray-100 p-8 text-center">

        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">
          Order Confirmed!
        </h1>

        {type === "stripe" ? (
          <p className="mt-3 text-gray-600">
            Your payment was successful. We've received your order and are
            preparing it for shipment.
          </p>
        ) : (
          <p className="mt-3 text-gray-600">
            Your order has been placed successfully. Please keep the payment
            ready for Cash on Delivery.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/orders")}
            className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/collection")}
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 transition"
          >
            Continue Shopping
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Redirecting to your orders in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default Verify;