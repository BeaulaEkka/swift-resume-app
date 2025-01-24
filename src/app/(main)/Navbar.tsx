import React from 'react'
import logo from '@/assets/resume-builder-logo.png'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
export default function Navbar() {
  return (
    <header className='shadow-sm'>
        <div className='max-w-7xl mx-auto p-3 flex items-center justify-between '>
            <Link href="/resumes">
            <div className='flex justify-center items-center gap-2'> <Image src={logo} alt="logo" width={35} height={35}/>
            <h1 className='font-extrabold text-blue-900 uppercase'><span className=''>Swift</span> AI Resume Builder</h1></div></Link>
            <UserButton appearance={{
                elements:{
                    avatarBox:{
                        height:35,
                        width:35
                    }

                }
            }}/>
            <UserButton.MenuItems><UserButton.Link/></UserButton.MenuItems>
            </div>
           
    
      
    </header>
  )
}

