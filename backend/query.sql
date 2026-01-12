-- name: GetLikesCount :one
SELECT COALESCE(
  (SELECT likes_count FROM likes WHERE dream_id = $1),
  0::bigint
)::bigint AS likes_count;

-- name: IncrementLikes :one
INSERT INTO likes (dream_id, likes_count)
VALUES ($1, 1)
ON CONFLICT (dream_id)
DO UPDATE SET likes_count = likes.likes_count + 1
RETURNING likes_count;
