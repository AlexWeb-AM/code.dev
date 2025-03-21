import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router";
import { checkOtp } from "../../slices/authSlice";
import toast from "react-hot-toast";

export const OtpCodeComponent = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const { isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }

            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const email = localStorage.getItem("email");

            if (!email) {
                toast.error("Email not found. Please try again.");
                return;
            }

            const otpCode = otp.join(""); 
            if (otpCode.length !== 6) {
                toast.error("Please enter a valid 6-digit OTP.");
                return;
            }

            await dispatch(checkOtp({ email, otp: otpCode })).unwrap();
            navigate("/change-password");
        } catch (err) {
            toast.error("Invalid OTP or an error occurred.", {
                style: { background: "#020202", color: "#fff" },
            });
            console.log(err);
        }
    };

    return (
        <div className="w-[390px] h-[270px] border-[1.5px] rounded-xl pl-6 border-neutral-800">
            <h3 className="text-white text-2xl font-semibold mt-7">Verify Email</h3>
            <p className="mt-1.5 text-neutral-400 text-sm">Enter the code that came to your email</p>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6 mt-7">
                    <div className="flex inputs_div">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                required
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                className="first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg w-14 h-14 text-lg border-neutral-700 border-1 text-center focus-visible:outline-none"
                            />
                        ))}
                    </div>

                    <button
                        disabled={isLoading}
                        className="bg-neutral-50 text-sm cursor-pointer text-black w-[340px] h-10 rounded-md transition-opacity hover:opacity-80 disabled:bg-neutral-500 disabled:cursor-auto"
                    >
                        Verify Email
                    </button>
                </div>
            </form>
        </div>
    );
};
