import type { MetaFunction } from "@remix-run/node"
import { useNavigate } from "@remix-run/react"
import { useEffect, useState } from "react"
import Select from "react-select"
import api from "../services/api"
import useCatalogStore from "~/store/catalogStore"
import SelectProps from "../types/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie recommender" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  const navigate = useNavigate()

  const [streamingsList, setStreamingsList] = useState<SelectProps[]>()

  const [selectedStreaming, setSelectedStreaming] = useState<number>()

  const [emotionsList, setEmotionsList] = useState<SelectProps[]>()

  const [selectedEmotion, setSelectedEmotion] = useState<number>()

  const mediaList = [
    { "label": "Movie", "value": "movies" },
    { "label": "Serie", "value": "series" }
  ]

  const [selectedMedia, setSelectedMedia] = useState<string>()

  const setCatalog = useCatalogStore((state: any) => state.setCatalog)

  useEffect(() => {
    getStreamings()

    getEmotions()
  }, [])

  const getStreamings = () => {
    api
      .get("/streamings")
      .then((response) => {
        console.log(response)

        let streamings = response.data

        let streamingOptions: SelectProps[] = []

        streamings && streamings.map((streaming: { name: string, id: number }) => {
          streamingOptions.push({ "label": streaming.name, "value": streaming.id })
        })

        setStreamingsList(streamingOptions)

      })
      .catch((error) => console.error(error))
  }

  const getEmotions = () => {
    api
      .get("/emotions")
      .then((response) => {
        console.log(response)

        let emotions = response.data

        let emotionsOptions: SelectProps[] = []

        emotions && emotions.map((emotion: { name: string, id: number }) => {
          emotionsOptions.push({ "label": emotion.name, "value": emotion.id })
        })

        setEmotionsList(emotionsOptions)

      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    console.log(selectedStreaming)

    api
      .get(`/${selectedMedia}/streaming/${selectedStreaming}/emotion/${selectedEmotion}`)
      .then((response) => {
        console.log(response)

        setCatalog(response.data)

        navigate("/catalog")
      })
      .catch((error) => console.error(error))

  }

  return (
    <>
      <div className="m-4">
        <h1 className="text-xl font-bold">
          Movie Recommender
        </h1>

        <p className="italic m-2">
          What Do You Want To Feel Today?
        </p>
      </div>

      <form onSubmit={(e: any) => handleSubmit(e)}>
        <div className="m-4">
          <Select
            placeholder="Streamings"
            options={streamingsList}
            onChange={(e: any) => setSelectedStreaming(e.value)}
          />
        </div>

        <div className="m-4">
          <Select
            placeholder="Media"
            options={mediaList}
            onChange={(e: any) => setSelectedMedia(e.value)}
          />
        </div>

        <div className="m-4">
          <Select
            placeholder="Media"
            options={emotionsList}
            onChange={(e: any) => setSelectedEmotion(e.value)}
          />
        </div>

        <div className="m-4">
          <button className="btn btn-neutral">
            Next
          </button>
        </div>
      </form>
    </>
  )
}