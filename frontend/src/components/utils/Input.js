const Input = ({ id, name, type, defaultValue, value, maxlength, min, max, className = "", disabled = false, onChange }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      required
      disabled={disabled}
      maxLength={maxlength}
      className={`block w-full p-[10px] rounded-[10px] border border-main-dark ${disabled ? "bg-stone-100" : ""} text-[16px] leading-[1.15] focus:transition ${className}`}
      onChange={onChange}
    />
  )
}
export default Input

export const Textarea = ({ id, name, type, defaultValue, maxlength, className = "", onChange }) => {
  return (
    <textarea
      id={id}
      type={type}
      name={name}
      defaultValue={defaultValue}
      required maxLength={maxlength}
      className={`block w-full h-[150px] p-[10px] rounded-[10px] border border-main-dark text-[16px] leading-[1.15] resize-none focus:transition ${className}`}
      onChange={onChange}
    />
  )
}
