'use server'

import { resumeSchema, ResumeValues } from '@/lib/validation'
import { auth } from '@clerk/nextjs/server'


export async function saveResume(values:ResumeValues) {
    const {id}=values
    console.log("recieved values",values)

    const {photo,workExperiences,educations,...resumeValues}=resumeSchema.parse(values)

    const{}=await auth()



  return (
    <div>
      
    </div>
  )
}
