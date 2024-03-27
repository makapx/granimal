interface ButtonProps {
    variant: 'primary' | 'secondary' | 'danger' | 'success';
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button = ({
    variant,
    text,
    onClick,
    disabled,
    className,
}: ButtonProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return `
                    bg-primary text-base-100
                    hover:bg-primary/90
                `;
            case 'secondary':
                return `
                    bg-secondary text-base-100
                    hover:bg-secondary/90
                `;
            case 'danger':
                return `
                    bg-danger text-base-100
                    hover:bg-danger/90
                `;
            case 'success':
                return `
                    bg-success text-base-100
                    hover:bg-success/90
                `;
            default:
                return `
                    bg-primary text-base-100
                    hover:bg-primary/90
                `;
        }
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
                py-3 px-4 inline-flex
                items-center gap-x-2 text-sm
                font-semibold rounded-lg
                border border-transparent
                bg-primary text-base-100
                disabled:opacity-50
                disabled:pointer-events-none
                ${getVariantStyles()}
                ${className}
            `}
        >
            {text}
        </button>
    );
};
export default Button;