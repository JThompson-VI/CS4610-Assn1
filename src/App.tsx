import { useState, useEffect } from 'react'
import { quotes_api_url } from './appconfig'
import { Quote, QuoteSearchResults } from './types'
import './App.css'

function App() {
  const [queryAuthorName, setqueryAuthorName] = useState<string>('')
  const [randQuote, setRandQuote] = useState<Quote>()
  const [searchRes, setSearchRes] = useState<QuoteSearchResults>()

  const trq: Quote = {
    // temp filler for useEffect
    _id: 'p8uhjt',
    content:
      'Your real strength comes from being the best you you can be. Who are you? What are you good at? What makes you, you?',
    author: 'Po',
    authorSlug: 'Po',
    length: 116,
    tags: [],
  }

  useEffect(() => {
    // fetch(`${quotes_api_url}/random`)
    //   .then((res) => res.json()) // TODO: check status
    //   .then((data) => {
    //     console.log(data)
    //     setRandQuote(data)
    //   })
    console.log('useeffect called')
    setRandQuote(trq)
  }, [])

  const fetchSearchRes = (event: React.FormEvent<HTMLElement>) => {
    console.log('called fetchSearchRes')
    event.preventDefault()

    if (queryAuthorName === '') {
      // could set some error state
      return
    }
    fetch(`${quotes_api_url}/search?query=${queryAuthorName}`)
      .then((res) => res.json()) // check for status
      .then((data) => {
        console.log(data)
        setSearchRes(data)
      })
  }

  // change App class to deal with screen center thing the body is doing
  return (
    <div className='App'>
      <h1>Quote Search</h1>
      <form onSubmit={fetchSearchRes}>
        <div className='search-bar'>
          <input
            name='authorname'
            placeholder='Thomas Jefferson'
            autoFocus
            value={queryAuthorName}
            type='search'
            onChange={(e) => setqueryAuthorName(e.target.value)}
          />
        </div>
      </form>
      {searchRes ? (
        <SearchResults results={searchRes} />
      ) : (
        <>
          <RandomQuote quote={randQuote} /> {/*rend if no search res*/}
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
