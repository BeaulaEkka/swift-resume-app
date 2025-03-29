import { Divide } from 'lucide-react'
import { create } from 'zustand'

interface PremiumModalState{
    open:boolean,
    setOpen:(open:boolean)=>void
}

const usePremiumModal=create<PremiumModalState>()((set)=>({
    open:false,
    setOpen:(open:boolean)=>set({open})

}))


function (){
    const{open,setOpen}=useStore()
    return(
        <div>
        </div>
    )
}