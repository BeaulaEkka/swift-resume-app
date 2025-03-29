import { Divide } from 'lucide-react'
import { create } from 'zustand'

interface PremiumModalState{
    open:boolean,
    setOpen:(open:boolean)=>void
}

const usePremiumModal=create<PremiumModalState>()((set)=>({

}))


function (){
    const{open,setOpen}=useStore()
    return(
        <div>
        </div>
    )
}