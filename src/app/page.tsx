"use client"

import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import CountryResults from "@/components/countryResults";

export default function Home() {
  const [input, setInput] = useState<string>("")
  const [searchResults, setSearchResult] = useState<Results | null>(null)
  const debounceSearchValue = useDebounce(input, 800)


  const fetchData = async () => {
    if (!debounceSearchValue) return setSearchResult(null)

    const res = await fetch(`https://speed-search-api-ndrainz.pcpeace5.workers.dev/api/search?q=${debounceSearchValue}`)
    const data = await res.json() as Results
    setSearchResult(data)
  }

  useEffect(() => {
    fetchData()
  }, [debounceSearchValue])

  return (
    <main className="max-w-3xl mx-auto px-5 min-h-screen pt-36">
      <div className="animate-in animate fade-in slide-in-from-bottom-2.5 duration-500 flex flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center">Speed Search</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API build with Hono, Next.js and Cloudflare.
          <br />
          Type a query below and get your results in miliseconds.
        </p>
        <CountryResults
          setInput={setInput}
          input={input}
          searchResults={searchResults}
        />
      </div>
    </main>
  );
}
