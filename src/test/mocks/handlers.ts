import { http, HttpResponse } from 'msw'
import path from 'node:path'
import fs from 'node:fs'

export const handlers = [
  http.get('/api/v1/data.json', () => {
    const dataFile = path.resolve(__dirname, '../../../public/api/v1/data.json')

    const data = fs.readFileSync(dataFile, {encoding: 'utf-8'})

    //console.info('DEBUG:', JSON.parse(data))

    return HttpResponse.json(JSON.parse(data))
  }),
]