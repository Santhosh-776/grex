"use client";

import Card from "../ui/Card";
import LoginForm from "./LoginForm";
import AuthPageUI from "../common/AuthPageUI";

const LoginFormUI: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 w-3/4 mx-auto">
            <AuthPageUI />
            <Card
                title="Welcome Back to Grex!"
                subtitle="Please login to your account"
                variant="default">
                <LoginForm />
            </Card>
        </div>
    );
};

export default LoginFormUI;
