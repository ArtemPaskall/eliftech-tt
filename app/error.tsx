"use client"
import { useEffect } from "react"

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Error:", error)
  }, [error])

  return (
    <div>
      <h1>Something went wrong</h1>
      <h3>{error.message}</h3>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
