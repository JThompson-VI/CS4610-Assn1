export type Quote = {
  readonly _id: string
  content: string
  author: string
  authorSlug: string
  length: number
  tags: []
}

export type QuoteSearchResults = {
  count: number
  totalCount: number
  page: number
  totalPages: number
  lastItemIndex: number
  results: [Quote]
}
