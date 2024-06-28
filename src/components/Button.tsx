import classNames from "classnames";

type ButtonProps = {
  variant?: "primary" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
};

const Button = ({ variant = "primary", onClick, children }: ButtonProps) => {
  return (
    <div className="cursor-pointer relative" onClick={onClick}>
      <span
        className={classNames(
          "absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded",
          {
            "bg-black": variant === "primary",
            "bg-gray-700": variant === "secondary",
          }
        )}
      ></span>
      <span
        className={classNames(
          "fold-bold relative inline-block h-full w-full rounded border-2 border-black px-3 py-1 text-base font-bold transition duration-100 text-center",
          {
            "text-black bg-white hover:bg-yellow-400 hover:text-gray-900":
              variant === "primary",
            "text-white bg-black hover:bg-gray-900 hover:text-yellow-500":
              variant === "secondary",
          }
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default Button;
