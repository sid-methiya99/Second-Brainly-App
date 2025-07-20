import { Button } from './components/Button'
import './index.css'
import { PlusIcon } from './components/icons/PlusIcon'
import { ShareIcon } from './components/icons/ShareIcon'

function App() {
   return (
      <div className="">
         <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
         />
         <br />
         <br />
         <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
         />
      </div>
   )
}

export default App
