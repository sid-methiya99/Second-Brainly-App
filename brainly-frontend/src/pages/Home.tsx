import { MainContent } from '../components/MainContent'
import { Navbar } from '../components/Navbar'

export const Home = () => {
   return (
      <div className="flex">
         <Navbar />
         <MainContent />
      </div>
   )
}
