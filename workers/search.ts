import { Redis } from "@upstash/redis/cloudflare";
import { Hono } from "hono";

type Bindings = {
  UPSTASH_TOKEN: string,
  UPSTASH_URL: string
}

export const searchRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    try {
      const start = performance.now()
      //----------------------------

      let query = c.req.query("q")
      if (!query) return c.json({ message: "Invalid search query" }, { status: 400 })
      query = query.toUpperCase()

      const { UPSTASH_URL, UPSTASH_TOKEN } = c.env

      const redis = new Redis({
        token: UPSTASH_TOKEN,
        url: UPSTASH_URL
      })

      const res: Array<string> = []
      const rank = await redis.zrank("terms", query)

      if (!rank) {
        return c.json(
          { results: [], message: "Countries not found" },
          { status: 400 }
        )
      }

      const temp = await redis.zrange<Array<string>>("terms", rank, rank + 50)

      for (const el of temp) {
        if (!el.startsWith(query)) break
        if (el.endsWith("*")) {
          res.push(el.substring(0, el.length - 1))
        }
      }

      //----------------------------
      const end = performance.now()
      return c.json({ results: res, duration: end - start })
    } catch (error) {
      console.log(error)
      return c.json({ message: "Something went wrong", results: [] }, { status: 500 })
    }
  })

