import { useState } from "react"
import { MovieList } from "../Movie/MovieList.jsx"

export const Clear = ({clear}) => {
    const [initialClear, setInitialClear] = useState(false)

    if (clear) {
        setInitialClear(true)
    }

    if (initialClear) {
        return (
            <MovieList></MovieList>
        )
    }
}
