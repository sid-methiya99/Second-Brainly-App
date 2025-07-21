import { MainContent } from '../components/MainContent'
import { Navbar } from '../components/Navbar'

export const Home = () => {
   return (
      <div className="flex">
         <div className="w-72">
            <Navbar />
         </div>
         <div className="flex-1 bg-[#F9FBFC]">
            <MainContent />
         </div>
      </div>
   )
}
