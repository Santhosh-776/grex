"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const setUser = useUserStore((state) => state.setUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post(
                "/api/auth/login",
                {
                    email,
                    password,
                    rememberMe,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.user) {
                setUser(response.data.user);
                router.push("/dashboard");
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-3/5">
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-6">
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
                            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Enter your email"
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
                            className="w-full pl-10 pr-12 py-2 rounded-lg border bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-sm"
                            placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a
                            href="#"
                            className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    <span>{isLoading ? "Signing in..." : "Sign In"}</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
