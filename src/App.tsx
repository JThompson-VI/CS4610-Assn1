import { useState, useEffect } from 'react'
import { quotes_api_url } from './appconfig'
import { Quote, QuoteSearchResults } from './types'
import './App.css'

function App() {
  const [queryAuthorName, setqueryAuthorName] = useState<string>('')
  const [randQuote, setRandQuote] = useState<Quote>()
  const [searchRes, setSearchRes] = useState<QuoteSearchResults>()

  useEffect(() => {
    fetch(`${quotes_api_url}/random`)
      .then((res) => res.json())
      .then((data) => {
        setRandQuote(data)
      })
  }, [])

  const fetchSearchRes = (event: React.FormEvent<HTMLElement>) => {
    console.log('called fetchSearchRes')
    event.preventDefault()

    if (queryAuthorName === '') {
      return
    }
    fetch(`${quotes_api_url}/search?query=${queryAuthorName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSearchRes(data)
      })
  }

  return (
    <div className='App'>
      <h1>Quote Search</h1>
      <form onSubmit={fetchSearchRes}>
        <div >
          <input
            name='authorname'
            placeholder='Thomas Jefferson'
            autoFocus
            value={queryAuthorName}
            type='search'
            className='search-bar'
            onChange={(e) => setqueryAuthorName(e.target.value)}
          />
        </div>
      </form>
      {searchRes ? (
        <SearchResults results={searchRes} />
      ) : (
        <>
          <RandomQuote quote={randQuote} />
        </>
      )}

    </div>
  )
}

const RandomQuote = ({ quote }: { quote?: Quote }) => {
  if (!quote) return <></>
  return (
    <div className='random-quote'>
      <p>{quote.content}</p>
      <p>
        {quote.author ? `- ${quote.author}` : "- Unknown Author"}
      </p>
    </div>
  )
}

const SearchResults = ({ results: searchResults }: { results?: QuoteSearchResults }) => {
  if (!searchResults) {
    return <></>
  }
  return (
    <div>
      {searchResults.results.map((quote) => {
        return (
          <div className='search-result-quote' key={quote._id}>
            <p>
              {quote.content}
            </p>
            <p className='quote-author'>
              - {quote.author}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default App
