'use client'

import { ApolloProvider, useQuery, gql } from "@apollo/client";
import { useParams } from 'next/navigation'
import client from "@/services/apollo-client";


const PLANET_QUERY = gql`
  query Planet($id: ID!) {
    planet(id: $id) {
      id,
      name,
      description,
      dimension
    }
  }
`;

export function Planet({ planet_id }: { planet_id: string}) {
  const { loading, error, data } = useQuery(PLANET_QUERY, {
    variables: { id: planet_id }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="sm:w-1/3">
      <h1 className="text-4xl">{data.planet.name}</h1>
      <p className="text-xs underline">
        <code>
          {data.planet.id}
        </code>
      </p>
      <div className="my-2">
        <p className="italic text-zinc-500">{data.planet.description}</p>
      </div>
      <div className="my-2">
        <ul>
          <li>
            <span className="font-bold">Dimension</span>: {data.planet.dimension}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function PlanetPage() {
  const { id }: {id: string} = useParams()

  return (
    <ApolloProvider client={client}>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Planet planet_id={id} />
      </div>
    </ApolloProvider>
    
  )
}

