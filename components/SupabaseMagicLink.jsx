import {
  supabaseClient
} from '../lib'

import {
  TWButton
} from '.'


import { useState } from 'react';

const SupabaseMagicLink = () => {
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [email, setEmail] = useState('')

  const onClick = async () => {
    let { user, error } = await supabaseClient.auth.signIn({
      email: email
    })

    setUser(user);
    setError(error);
  }

  return (
    <div>
      <h2 className='text-lg text-center font-bold mb-6'>
        Magic Link Login
      </h2>
      {error && 
        <div>
          {JSON.stringify(error)}
        </div>
      }
      {user &&
        <div>
          {JSON.stringify(user)}
        </div>
      }
      <div>
        <h3 className='text-lg font-semibold mb-3'>
          Email
        </h3>
        <input
          type='text'
          className='border px-3 py-1 mb-3 w-full'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
        />
        <TWButton
          onClick={onClick}
        >
          Send Link
        </TWButton>
      </div>

    </div>
  )

}

export default SupabaseMagicLink;