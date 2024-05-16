"use client"

import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

type Results = {
  results: Array<string>
  duration: number
}


export default function Home() {
  const [input, setInput] = useState<string>("")
  const [searchResults, setSearchResult] = useState<Results | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResult(null)

      const res = await fetch(`https://speed-search-api-ndrainz.pcpeace5.workers.dev/api/search?q=${input}`)
      const data = await res.json() as Results
      setSearchResult(data)
    }

    fetchData()
  }, [input])

  return (
    <main className="max-w-3xl mx-auto px-5 min-h-screen flex items-center justify-center">
      <div className="animate-in animate fade-in slide-in-from-bottom-2.5 duration-500 flex flex-col gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-center">Speed Search</h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance API build with Hono, Next.js and Cloudflare.
          <br />
          Type a query below and get your results in miliseconds.
        </p>
        <div className="max-w-md w-full mx-auto">
          <Command>
            <CommandInput onValueChange={setInput} value={input} placeholder="Search countries..." />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <>
                  <CommandGroup heading="Results">
                    {searchResults.results.map((country) => (
                      <CommandItem key={country}>{country}</CommandItem>
                    ))}
                  </CommandGroup>
                </>
              ) : null}

              {searchResults?.results && searchResults?.duration ? (
                <>
                  <hr className='h-px w-full bg-foreground' />
                  <p className="p-2 text-xs text-muted-foreground">
                    Found {searchResults.results.length} results in {searchResults.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
      </div>
    </main>
  );
}
