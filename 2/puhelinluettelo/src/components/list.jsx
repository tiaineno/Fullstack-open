const List = ({searchResult, removeName}) => (
    <div>
        <ul>
          {searchResult.map(person => (<li key={person.name}> {person.name} {person.number}
            <button onClick={() => removeName(person.id, person.name)}>delete</button>
          </li>))}
        </ul>
    </div>
  )

export default List