'use client'

import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "@/services/apollo-client";
import Link from 'next/link'


const PLANETS_QUERY = gql`
  query GetPlanets {
    planets {
      id,
      name,
      description,
      dimension
    }
  }
`;

export type Planet = {
  id: string;
  name: string;
  description: string;
  dimension: number
}

function Planets() {
  const { loading, error, data } = useQuery(PLANETS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="sm:w-1/3">
      {data.planets.map((planet: Planet, index: number) => (
        <div key={`planet-${index}`}>
          <h1 className="text-4xl">{planet.name}</h1>
          <Link href={`/planets/${planet.id}`} className="text-xs underline">
            <code>
              {planet.id}
            </code>
          </Link>
          <div className="my-2">
            <p className="italic text-zinc-500">{planet.description}</p>
          </div>
          <div className="my-2">
            <ul>
              <li>
                <span className="font-bold">Dimension</span>: {planet.dimension}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PlanetsPage() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <Planets />
      </div>
    </ApolloProvider>
  )
}
