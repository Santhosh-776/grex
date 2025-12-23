import React from "react";

interface CardProps {
    title?: string;
    subtitle?: string;
    content?: string;
    children: React.ReactNode;
    variant?: "default" | "outlined" | "elevated";
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    content,
    children,
    variant = "default",
}) => {
    return (
        <div
            className={`rounded-lg p-4 w-1/2 ${
                variant === "outlined"
                    ? "border  border-gray-300 shadow-md"
                    : ""
            } ${variant === "elevated" ? "shadow-lg" : ""}`}>
            {title && <h2 className="text-xl font-bold">{title}</h2>}
            {subtitle && (
                <h3 className="text-sm  text-shadow-secondary">{subtitle}</h3>
            )}
            {content && <p className="text-secondary">{content}</p>}
            {<div className="my-6">{children}</div>}
        </div>
    );
};

export default Card;
