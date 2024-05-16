import { Redis } from '@upstash/redis'
import { countryList } from "./countryList"
import { config } from "dotenv"

config({
  path: ".dev.vars"
})

const redis = new Redis({
  url: process.env.UPSTASH_URL!,
  token: process.env.UPSTASH_TOKEN!,
})

countryList.forEach((country) => {
  const term = country.toUpperCase()
  const terms: Array<{ score: 0, member: string }> = []

  for (let i = 0; i <= term.length; i++) {
    if (term.substring(0, i).length === 0) continue
    terms.push({ score: 0, member: term.substring(0, i) })
  }
  terms.push({ score: 0, member: term + "*" })

  const populate = async () => {
    // @ts-expect-error
    await redis.zadd("terms", ...terms)
  }
  populate().then(() => console.log(`${term} - success inserted`))
})

