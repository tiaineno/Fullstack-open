import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/results'
import Filter from './components/filter'

const App = () => {
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setList(response.data.map(c => ({
          name: c.name.common,
          capital: c.capital,
          area: c.area,
          flag: c.flags.png,
          lang: c.languages 
        })))
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const show = (name) => {
    const r=(list.filter(c => c.name.toLowerCase().includes(name.toLowerCase())))
    setResults(r)
  }

  useEffect(() => {
    const r=(list.filter(c => c.name.toLowerCase().includes(search.toLowerCase())))
    setResults(r)
  }, [search])

  return (
    <div>
      <Filter onChange={handleSearchChange} search={search} />
      <Results results={results} onClick={show}/>
    </div>
  )

}

export default App