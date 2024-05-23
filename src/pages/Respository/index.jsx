const Repository = ({match}) => {
    return (
    <h1>${decodeURIComponent(match.params.repository)}</h1>
    )
}

export default Repository