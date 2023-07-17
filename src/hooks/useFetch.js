import axios from 'axios'
import { useState } from 'react'

const useFetch = ( url ) => {

    const [infoApi, setInfoApi] = useState()
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const getApi = () => {
        setIsLoading(true)
        axios.get(url)
        .then(res => {
            setInfoApi(res.data)
            setHasError(false)
        })
        .catch(err => {
            console.log(err)
            setHasError(true)
        })
        .finally(() => // se resuelve la promesa
            setTimeout(() => {
                setIsLoading(false);
            }, 200)
        )
    }

    return [ infoApi, getApi, hasError, isLoading ]

}

export default useFetch