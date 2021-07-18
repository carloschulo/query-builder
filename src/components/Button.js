import "./buttonStyles.css";
export default function Button({
  children,
  buttonType = "button",
  transparent = false,
  ...rest
}) {
  return (
    <button
      className={transparent ? "button transparent" : "button"}
      type={buttonType}
      {...rest}
    >
      {children}
    </button>
  );
}
