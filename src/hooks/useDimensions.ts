import React, { useEffect, useState } from "react";

export default function useDimensions(containerRef:React.RefObject<HTMLElement>) {
    const [dimensions, setDimensions] = useState({ width: 0, height:
        0 });
        useEffect(()=>{
            const currentRef=containerRef.current;
            function getDimensions(){

            }

        })
  return (

  )
}
