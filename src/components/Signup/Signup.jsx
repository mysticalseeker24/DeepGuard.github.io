import React from "react";
import logo from "/src/assets/deeptrace_logo_transparent.png";
import { FcGoogle } from "react-icons/fc";

function Signup() {
return (
    <div className="h-screen flex justify-center items-center gap-36">
        <div className="flex gap-[30px]">
            <img src={logo} className="h-16"></img>
            <div className="text-5xl font-bold">DeepTrace</div>
        </div>
        <div className="bg-[#252525] px-10 py-8 rounded-[20px]">
            <div>
                <div className="text-sm font-semibold text-[#787878]">Sign Up</div>
                <div className="text-3xl font-semibold">Create an account</div>
            </div>

            <div className="mt-4">
                <div className="text-md font-semibold">
                    Sign up via Social Channels
                </div>
                <div className="text-md ">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#1473E6]">
                        Log In
                    </a>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={() => {
                        window.location.href = "http://localhost:5000/auth/google";
                    }}
                    className="w-[360px] flex gap-4 justify-center items-center px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd hover:bg-[#f1f3f505]"
                >
                    <FcGoogle className="scale-[1.5]" /> Sign Up with Google
                </button>
            </div>

            <div className="mt-1">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-[#f1f3f515] border-0" />
                    <span className="absolute px-3 font-medium text-[#f1f3f550] bg-[#252525]">
                        Or
                    </span>
                </div>
            </div>

            <div className="mt-1">
                <form className="flex flex-col gap-1.5">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-[360px] px-4 py-2.5 bg-[#1e1e1e] rounded-full border border-1 border-[#f1f3f515] hover:border hover:border-[#f1f3f550]"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-[360px] px-4 py-2.5 bg-[#1e1e1e] rounded-full border border-1 border-[#f1f3f515] hover:border hover:border-[#f1f3f550]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-[360px] px-4 py-2.5 bg-[#1e1e1e] rounded-full border border-1 border-[#f1f3f515] hover:border hover:border-[#f1f3f550]"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-[360px] px-4 py-2.5 bg-[#1e1e1e] rounded-full border border-1 border-[#f1f3f515] hover:border hover:border-[#f1f3f550]"
                    />
                    <button
                        type="submit"
                        className="w-[360px] px-4 py-2.5 rounded-full bg-[#f1f3f5] hover:bg-[#ddd] text-md text-gray-900 font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default Signup;
