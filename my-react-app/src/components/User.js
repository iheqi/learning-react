import React, { useReducer } from "react"

export default function User() {
  const firstUser = {
    id: '123',
    firstName: 'Bill',
    lastName: 'Wilson'
  }

  const [user, setUser] = useReducer((user, newDetail) => ({ ...user, ...newDetail }), firstUser);


  return (
    <>
      <h1>
        Full name: {user.firstName}-{user.lastName}
        Id: {user.id}
      </h1>

      <button onClick={() => { setUser({ id: 456 }) }}>
        setUser
      </button>
    </>
  )
}