'use client'

import { ApolloProvider, useQuery, gql } from "@apollo/client";
import client from "@/services/apollo-client";
import Link from 'next/link'


const PLANETS_QUERY = gql`
  query {
    id,
    name,
    description,
    dimension
  }
`;

function Planets() {
  const { loading, error, data } = useQuery(PLANETS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="sm:w-1/3">
      <h1 className="text-4xl">{data.name}</h1>
      <Link href={`/planets/${data.id}`} className="text-xs underline">
        <code>
          {data.id}
        </code>
      </Link>
      <div className="my-2">
        <p className="italic text-zinc-500">{data.description}</p>
      </div>
      <div className="my-2">
        <ul>
          <li>
            <span className="font-bold">Dimension</span>: {data.dimension}
          </li>
        </ul>
      </div>
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
