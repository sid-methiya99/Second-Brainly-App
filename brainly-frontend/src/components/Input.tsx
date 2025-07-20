interface InputTypes {
   type: string
   placeholder: string
   value?: string
}
export const Input = ({ type, placeholder, value }: InputTypes) => {
   return (
      <input
         type={type}
         placeholder={placeholder}
         value={value}
         className="bg-gray-300 px-5 py-2 rounded w-72 outline-none"
      />
   )
}
