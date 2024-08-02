const Filter = ({onChange, search}) => (
    <div>
      filter shown with
      <input
        value={search}
        onChange={onChange}
      />
    </div>
  )

export default Filter