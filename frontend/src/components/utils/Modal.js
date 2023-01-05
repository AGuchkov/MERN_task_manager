import FormWrap from "./FormWrap"

const Modal = ({ setActive, form }) => {
  return (
    <div className="w-full h-full fixed z-20 inset-0 flex justify-center items-center bg-shadow-rgba" onClick={() => setActive(false)}>
      <FormWrap setActive={setActive} form={form} />
    </div>
  )
}

export default Modal