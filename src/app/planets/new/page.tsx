'use client'

import { ApolloProvider, gql, useMutation } from '@apollo/client';
import client from "@/services/apollo-client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'


const CREATE_PLANET = gql`
  mutation AddPlanet($name: String!, $description: String!, $dimension: Float!, $picture: String!) {
    createPlanet(name: $name, description: $description, dimension: $dimension, picture: $picture) {
      id
      name
      description
      dimension
      picture
    }
  }
`;

function CreatePlanet() {
  const router = useRouter()

  const [createPlanet, { data, loading, error }] = useMutation(CREATE_PLANET);

  const [planetName, setPlanetName] = useState('')
  const [planetDescription, setPlanetDescription] = useState('')
  const [planetDimension, setPlanetDimension] = useState(0)
  const [planetPicture, setPlanetPicture] = useState('')

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  function onSubmit(e) {
    e.preventDefault()
    console.log(planetName)
    console.log(planetDescription)
    console.log(planetPicture)

    createPlanet({ variables: { name: planetName, description: planetDescription, dimension: planetDimension, picture: planetPicture }})
    .then(response => {
      console.log('response', response)
      setPlanetName('')
      setPlanetDescription('')
      setPlanetPicture('')
      router.push('/planets')
    })
    .catch(error => {
      console.error("Error while creating planet", error)
    })
  }

  return (
    <div className=''>
      <div className='my-6'>
        <h1 className="text-2xl">Create new planet</h1>
      </div>
      <div>
        <form className='flex flex-col gap-4' onSubmit={onSubmit}>
          <div className='flex flex-col'>
            <label className='text-sm'>Name</label>
            <input
              className="border-1 border-zinc-400 rounded-sm bg-zinc-100 text-sm font-light px-1"
              type="text"
              name="Name"
              value={planetName}
              onChange={e => setPlanetName(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm'>Description</label>
            <input
              className="border-1 border-zinc-400 rounded-sm bg-zinc-100 text-sm font-light px-1"
              type="text"
              name="Description"
              value={planetDescription}
              onChange={e => setPlanetDescription(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm'>Dimension</label>
            <input
              className="border-1 border-zinc-400 rounded-sm bg-zinc-100 text-sm font-light px-1"
              type="number"
              name="Dimension"
              value={planetDimension}
              onChange={e => setPlanetDimension(Number(e.target.value))}
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-sm'>Picture</label>
            <input
              className="border-1 border-zinc-400 rounded-sm bg-zinc-100 text-sm font-light px-1"
              type="text"
              name="Picture"
              value={planetPicture}
              onChange={e => setPlanetPicture(e.target.value)}
            />
          </div>
          <button
            className='border-1 rounded-sm bg-zinc-700 hover:bg-zinc-500 text-zinc-50 hover:cursor-pointer hover:bg-zinc'
            type="submit"
          >
            Add Planet
          </button>
        </form>
      </div>
    </div>
  )
}

export default function CreatePlanetPage() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-row min-h-screen justify-center items-center">
        <CreatePlanet />
      </div>
    </ApolloProvider>
  )
}