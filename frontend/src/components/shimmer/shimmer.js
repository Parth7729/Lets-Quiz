import "./shimmer.css";

const shimmerCard = (
    <div className="shimmer-card">Content is Loading..</div>
)

const Shimmer = () => {     //shimmer UI
    return (
        <div className="shimmer">
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
            {shimmerCard}
        </div>
    )
}

export default Shimmer;