import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        console.log(sessionId);

        setTimeout(() => {
            navigate("/orders");
        }, 2000);

    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>
                <h2>Payment Successful 🎉</h2>
                <p>Redirecting to your orders...</p>
            </div>
        </div>
    );
};

export default Verify;