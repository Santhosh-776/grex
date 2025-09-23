import React from "react";
import Card from "../ui/Card";
import SignupForm from "./SignupForm";
import AuthPageUI from "../common/AuthPageUI";

const SignupFormUI = () => {
    return (
        <div className="flex items-center justify-center min-h-screen px-4 w-3/4 mx-auto">
            <AuthPageUI />
            <Card
                title="Join Grex Today!"
                subtitle="Create your account"
                variant="default">
                <SignupForm />
            </Card>
        </div>
    );
};

export default SignupFormUI;
