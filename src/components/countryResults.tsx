import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Dispatch, SetStateAction } from "react"

type Props = {
  setInput: Dispatch<SetStateAction<string>>
  input: string
  searchResults: Results | null
}

const CountryResults = ({
  setInput, input, searchResults
}: Props) => {

  return (
    <div className="max-w-md w-full mx-auto">
      <Command className="border">
        <CommandInput onValueChange={setInput} value={input} placeholder="Search countries..." />
        <CommandList>
          {searchResults?.results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : null}

          {searchResults?.results ? (
            <CommandGroup heading="Results">
              {searchResults.results.map((country) => (
                <CommandItem key={country}>{country}</CommandItem>
              ))}
            </CommandGroup>
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
  )
}

export default CountryResults
