"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Image, ArrowRight } from "lucide-react";
import axios from "axios";

const SignupForm = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post("api/auth/signup", {
                name,
                email,
                password,
                confirmPassword,
                profileImage,
            });

            if (res.status === 201) {
                setSuccess("Account created successfully! Redirecting...");
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
        } catch (err: any) {
            setError(err.response?.data?.message + " Redirecting to login...");
            if (err.response?.data?.message == "User already exists") {
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 max-w-md w-full">
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg block">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg block">
                    <p className="text-green-600 text-sm">{success}</p>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Full Name
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-1 rounded-lg border bg-gray-50 border-gray-300 
                            text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent 
                            transition-all duration-200 text-sm"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Confirm your password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Profile Image URL{" "}
                        <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                        <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="url"
                            value={profileImage}
                            onChange={(e) => setProfileImage(e.target.value)}
                            className="w-full pl-10 pr-4 py-1 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Enter profile image URL"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm">
                    <span>{loading ? "Loading..." : "Get Started"}</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
