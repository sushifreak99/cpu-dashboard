import { rest } from 'msw'

import type { CpuLoad } from '../src/cpuLoad/types'

export const handlers = [
  rest.get('http://localhost:3000/api/stats', (_req, res, ctx) => {
    const data: CpuLoad = {
      timestamp: new Date().getTime(),
      value:
        0.8 * 0.01 * Math.random() +
        0.03 * Math.random() +
        0.01 * Math.random(),
    }

    return res(ctx.status(200), ctx.json(data))
  }),
]
