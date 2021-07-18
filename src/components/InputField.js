import "./inputStyles.css";
export default function InputField({
  inputType = "text",
  inputName = "",
  value = "",
  ...rest
}) {
  return (
    <>
      <input
        className="input"
        type={inputType}
        name={inputName}
        value={value}
        {...rest}
      />
    </>
  );
}
