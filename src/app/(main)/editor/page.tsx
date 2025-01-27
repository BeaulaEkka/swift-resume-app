import React from 'react'
import {Metadata} from 'next'
import ResumeEditor from './ResumeEditor'

export const metadata:Metadata={
    title:'Design your resume',
   
}
export default function page() {
  return (
    <div>
      <ResumeEditor/>
    </div>
  )
}

