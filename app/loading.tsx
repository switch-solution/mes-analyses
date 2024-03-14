"use client";
import { Progress } from "@/components/ui/progress"
import { useEffect } from "react"
import { useState } from "react"
export default function Loading() {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => prevProgress < 100 ? prevProgress + 10 : 0)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex size-full flex-col items-center justify-center">
            <Progress value={progress} className="w-3/5" />
        </div>

    )
}