const FormWrap = ({ setActive, form }) => {
  return (
    <>
      <div className="min-w-[315px] max-w-[520px] w-[40%] p-[14px] bg-main-light rounded-[10px]" onClick={e => e.stopPropagation()}>
        <ul className="flex justify-end mx-[-3px]">
          <li className='w-[22px] h-[22px] mx-[3px] rounded-[50%] bg-main-blue border border-main-blue'></li>
          <li className='w-[22px] h-[22px] mx-[3px] rounded-[50%] bg-main-blue border border-main-blue'></li>
          <li className='w-[22px] h-[22px] mx-[3px] rounded-[50%] bg-main-blue border border-main-blue'></li>
          <li className='w-[22px] h-[22px] mx-[3px] rounded-[50%] border border-gray border-dashed flex justify-center items-center'>
            <button className="w-full h-full text-[14px] text-gray fa-solid fa-xmark" onClick={() => setActive(false)}></button>
          </li>
        </ul>
        {form}
      </div>
    </>
  )
}

export default FormWrap