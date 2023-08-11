import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:3000/api/stats', (req, res, ctx) => {
    const data = {}

    return res(ctx.status(200), ctx.json(data))
  }),
]
