import staticData from '../../static.json'

export default function UserPicker() {
  const { users } = staticData
  return (
    <select>
      {users.map((u) => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  )
}
