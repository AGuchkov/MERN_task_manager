import User from "./User"
import { sorting } from "../common_fun"
import { useEffect, useState } from "react"

const AdminBar = ({ users, roles }) => {
  const [sortedUserArr, setSortedUserArr] = useState([])

  useEffect(() => {
    if (users) {
      setSortedUserArr(sorting(users, "createdAt"))
    }
  }, [users])

  return (
    <ul className="w-full">
      {sortedUserArr && sortedUserArr.map(user => (
        <User
          key={user._id}
          id={user._id}
          name={user.userName}
          email={user.userEmail}
          hasRoles={user.roles}
          roles={roles}
        />
      ))}
    </ul>
  )
}

export default AdminBar