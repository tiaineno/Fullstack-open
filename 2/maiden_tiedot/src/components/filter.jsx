const Filter = ({onChange, search}) => (
    <div>
      find countries
      <input
        value={search}
        onChange={onChange}
      />
    </div>
  )

export default Filter