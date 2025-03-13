'use client'

import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { useParams } from 'next/navigation'
import client from "@/services/apollo-client";


const PLANET_QUERY = gql`
  query {
    id,
    name,
    description,
    dimension
  }
`;

export function Planet() {
  return (
    <div>
      <div>
        Planet babeee
      </div>
    </div>
  )
}

export default function PlanetPage() {
  const params = useParams()
  console.log(params)

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Planet />
      </div>
    </ApolloProvider>
    
  )
}

