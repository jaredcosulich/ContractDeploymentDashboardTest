import {
  supabaseClient
} from '../lib'

import {
  ContractDeploymentDashboardTestLayout,
  TWConstrainedCenteredContent,
  SupabaseMagicLink,
  ContractDeploymentDashboardProjects
} from '.'

import { useUser, Auth } from '@supabase/supabase-auth-helpers/react'
// import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useEffect, useState } from 'react'

const ContractDeploymentDashboardTest = ({  }) => {
  const { user, error } = useUser()
  const [data, setData] = useState({})

  useEffect(() => {
    console.log("USER", user)
    const user2 = supabaseClient.auth.user()
    console.log(user2)
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])

  if (!user) {
    return (
      <ContractDeploymentDashboardTestLayout>
        <TWConstrainedCenteredContent>
          <div className='py-12'>
            {error && <p>{error.message}</p>}
            <SupabaseMagicLink />
          </div>
        </TWConstrainedCenteredContent>
      </ContractDeploymentDashboardTestLayout>
    )
  }

  // if (!user) {
  //   return (
  //     <ContractDeploymentDashboardTestLayout>
  //       <TWConstrainedCenteredContent>
  //         <div className='py-12'>
  //           {error && <p>{error.message}</p>}
  //           <Auth
  //             // view="update_password"
  //             supabaseClient={supabaseClient}
  //             providers={['github']}
  //             socialLayout="horizontal"
  //             socialButtonSize="xlarge"
  //             magicLink={true}
  //           />
  //         </div>
  //       </TWConstrainedCenteredContent>
  //     </ContractDeploymentDashboardTestLayout>
  //   )
  // }

  return (
    <ContractDeploymentDashboardTestLayout>
      <ContractDeploymentDashboardProjects />

      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </ContractDeploymentDashboardTestLayout>
  )

  // return (
  //   <div>
  //     <ContractDeploymentDashboardHeader />
  //     <LatestContractCompilation />
  //     <ContractDeployments />
  //   </div>
  // )
}

// export const getServerSideProps = async ({ req }) => {
//   const token = req.headers.AUTHORIZATION
//   const userId = await getUserId(token)
//   const posts = await prisma.post.findMany({
//     where: {
//       author: { id: userId },
//     },
//   })
//   return { props: { posts } }
// }

export default ContractDeploymentDashboardTest;