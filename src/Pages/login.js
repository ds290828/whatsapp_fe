import Loginform from "../components/auth/Loginform";

export default function Login() {
  return (
    <div className="h-screen bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Containers */}
      <div className="flex w-[1600px] mx-auto h-full">
         {/* Register form */}
         <Loginform/>
      </div>
    </div>
  )
}
